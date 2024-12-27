package br.com.estruttijp.services;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder.SecretKeyFactoryAlgorithm;
import org.springframework.stereotype.Service;

import br.com.estruttijp.controller.UserController;
import br.com.estruttijp.data.vo.v1.UserVO;
import br.com.estruttijp.data.vo.v1.security.AccountCredentialsVO;
import br.com.estruttijp.data.vo.v1.security.TokenVO;
import br.com.estruttijp.exceptions.EmailAlreadyExistsException;
import br.com.estruttijp.exceptions.ResourceNotFoundException;
import br.com.estruttijp.mapper.DozerMapper;
import br.com.estruttijp.model.Permission;
import br.com.estruttijp.model.User;
import br.com.estruttijp.repositories.PermissionRepository;
import br.com.estruttijp.repositories.UserRepository;
import br.com.estruttijp.security.jwt.JwtTokenProvider;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class AuthServices {

    private static final Logger logger = LoggerFactory.getLogger(AuthServices.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserRepository repository;

    @Autowired
    private PermissionRepository permissionRepository;
    
    @Autowired 
    private JavaMailSender emailSender; 

    @SuppressWarnings("rawtypes")
    public ResponseEntity signin(AccountCredentialsVO data) {
        try {
            var username = data.getUsername();
            var password = data.getPassword();
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            var user = repository.findByUsername(username);

            var tokenResponse = new TokenVO();
            if (user != null) {
                tokenResponse = tokenProvider.createAccessToken(username, user.getRoles());
            } else {
                throw new UsernameNotFoundException("Username " + username + " not found!");
            }
            return ResponseEntity.ok(tokenResponse);
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid username/password supplied!");
        }
    }

    @SuppressWarnings("rawtypes")
    public ResponseEntity register(UserVO data) {
        var emailUsed = repository.findByUsername(data.getUsername());

        if (emailUsed != null) {
            throw new EmailAlreadyExistsException();
        }

        var user = new User();
        user.setUserName(data.getUsername());
        user.setFullName(data.getFullName());
        user.setPassword(encryptPassword(data.getPassword())); // Encripta a senha
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);

        List<Permission> userPermissions;
        if (data.getPermissions() != null && !data.getPermissions().isEmpty()) {
            userPermissions = permissionRepository.findAllByDescriptionIn(data.getPermissions());
            if (userPermissions.isEmpty()) {
                throw new IllegalStateException("Nenhuma das permissões informadas foi encontrada.");
            }
        } else {
            var defaultPermission = permissionRepository.findByDescription("COMMON_USER")
                    .orElseThrow(() -> new IllegalStateException("Permissão padrão 'COMMON_USER' não encontrada."));
            userPermissions = Collections.singletonList(defaultPermission);
        }
        user.setPermissions(userPermissions);
        repository.save(user);

        String subject = "Bem-vindo(a) à TasksFlow!"; 
        String htmlBody = "<h3>Olá, " + user.getFullName() + "!</h3>" + 
        		"<p>Estamos muito felizes em tê-lo(a) conosco.</p>" + 
        		"<p>Aqui estão algumas informações úteis para começar:</p>" + 
        		"<ul>" + 
        			"<li><a href='http://localhost:8080/swagger-ui/index.html'>Guia de Início</a></li>" + 
        			"<li><a href='http://localhost:8080/swagger-ui/index.html'>Centro de Ajuda</a></li>" + 
        		"</ul>" + 
        		"<p>Se precisar de qualquer assistência, não hesite em nos contatar.</p>" + 
        		"<p>Atenciosamente,<br>TasksFlow</p>"; 
        try { 
        	sendHtmlEmail(user.getUsername(), subject, htmlBody); 
        } catch (MessagingException e) { 
        	e.printStackTrace();
        }
        return ResponseEntity.ok("Usuário registrado com sucesso!");
    }

    public List<UserVO> findAll() {
        logger.info("Finding all Users!");

        var users = DozerMapper.parseListObjects(repository.findAll(), UserVO.class);
        users
                .stream()
                .forEach(p -> p.add(linkTo(methodOn(UserController.class).findById(p.getKey())).withSelfRel()));
        return users;
    }

    public UserVO findById(Long id) {
        logger.info("Finding one User!");
        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
        var vo = DozerMapper.parseObject(entity, UserVO.class);
        vo.add(linkTo(methodOn(UserController.class).findById(id)).withSelfRel());
        return vo;
    }

    public void delete(Long id) {
        logger.info("Deleting one user!");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
        entity.getPermissions().clear();
        repository.save(entity);
        repository.delete(entity);
    }
    
    public void sendHtmlEmail(String to, String subject, String htmlBody) throws MessagingException { 
    	MimeMessage message = emailSender.createMimeMessage(); 
    	MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8"); 
    	helper.setTo(to); 
    	helper.setSubject(subject); 
    	helper.setText(htmlBody, true); // O parâmetro 'true' indica que o conteúdo é HTML 
    	emailSender.send(message); 
    }

    public String encryptPassword(String password) {
        Map<String, PasswordEncoder> encoders = new HashMap<>();

        Pbkdf2PasswordEncoder pbkdf2Encoder
                = new Pbkdf2PasswordEncoder(
                        "", 8, 185000,
                        SecretKeyFactoryAlgorithm.PBKDF2WithHmacSHA256);

        encoders.put("pbkdf2", pbkdf2Encoder);
        DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("pbkdf2", encoders);
        passwordEncoder.setDefaultPasswordEncoderForMatches(pbkdf2Encoder);

        String encryptedPassword = passwordEncoder.encode(password);

        return removePrefixSuffix(encryptedPassword);
    }

    public static String removePrefixSuffix(String password) {
        if (password != null && password.startsWith("{pbkdf2}")) {
            return password.substring("{pbkdf2}".length());
        }
        return password;
    }
}
