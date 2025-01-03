package br.com.estruttijp.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.estruttijp.repositories.UserRepository;

@Service
public class UserServices implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserServices.class);

    @Autowired
    UserRepository repository;

    public UserServices(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.debug("Finding one user by email " + email + "!");
        var user = repository.findByUsername(email);
        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("Email " + email + " not found!");
        }
    }

}
