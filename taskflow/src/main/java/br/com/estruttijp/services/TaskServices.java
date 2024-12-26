package br.com.estruttijp.services;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.estruttijp.controller.TaskController;
import br.com.estruttijp.data.vo.v1.TaskVO;
import br.com.estruttijp.exceptions.RequiredObjectIsNullException;
import br.com.estruttijp.exceptions.ResourceNotFoundException;
import br.com.estruttijp.mapper.DozerMapper;
import br.com.estruttijp.model.Project;
import br.com.estruttijp.model.Task;
import br.com.estruttijp.model.User;
import br.com.estruttijp.repositories.ProjectRepository;
import br.com.estruttijp.repositories.TaskRepository;
import br.com.estruttijp.repositories.UserRepository;

@Service
public class TaskServices {

	 private Logger logger = Logger.getLogger(TaskServices.class.getName());

	 @Autowired
	 TaskRepository repository;
	 
	 @Autowired
	 UserRepository userRepository;
	 
	 @Autowired
	 ProjectRepository projectRepository;
	 
	 public List<TaskVO> findAll() {

	        logger.info("Finding all tasks!");

	        List<Task> taskEntities = repository.findAll(); 
	        List<TaskVO> taskVOs = DozerMapper.mapTaskListToTaskVOList(taskEntities); 
	        taskVOs.forEach(p -> p.add(linkTo(methodOn(TaskController.class).findById(p.getKey())).withSelfRel()));
	        return taskVOs;
	    }

	    public TaskVO findById(Long id) {

	        logger.info("Finding one task!");

	        var entity = repository.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	        TaskVO vo = DozerMapper.mapTaskToTaskVO(entity); 
	        vo.add(linkTo(methodOn(TaskController.class).findById(id)).withSelfRel()); 
	        return vo;
	    }

	    @Transactional
	    public TaskVO create(TaskVO taskVO) {
	        if (taskVO == null) {
	            throw new RequiredObjectIsNullException();
	        }
	        logger.info("Creating one task!");
	        List<User> members = userRepository.findAllById(taskVO.getMemberIds());
	        if (members.isEmpty()) {
	            throw new IllegalStateException("Nenhum membro encontrado para os IDs fornecidos.");
	        }
	        Project project = projectRepository.findById(taskVO.getProjectId())
	        	    .orElseThrow(() -> new IllegalStateException("Nenhum projeto encontrado para o ID fornecido."));
	        var task = new Task();
	        task.setName(taskVO.getName());
	        task.setStatus("pendente");
	        task.setDescription(taskVO.getDescription());
	        task.setCreator(taskVO.getCreator());
	        task.setLaunchDate(taskVO.getLaunchDate());
	        task.setDeadline(taskVO.getDeadline());
	        task.setProject(project);
	        task.setMembers(members);
	        var savedEntity = repository.save(task);

	        // Converte manualmente para TaskVO
	        var vo = new TaskVO();
	        vo.setKey(savedEntity.getId());
	        vo.setStatus(savedEntity.getStatus());
	        vo.setName(savedEntity.getName());
	        vo.setDescription(savedEntity.getDescription());
	        vo.setCreator(savedEntity.getCreator());
	        vo.setLaunchDate(savedEntity.getLaunchDate());
	        vo.setDeadline(savedEntity.getDeadline());
	        vo.setProjectId(savedEntity.getProject().getId());
	        vo.setMemberIds(
	            savedEntity.getMembers().stream()
	                .map(User::getId)
	                .collect(Collectors.toList())
	        );
	        vo.add(linkTo(methodOn(TaskController.class).findById(vo.getKey())).withSelfRel());
	        return vo;
	    }

	    public TaskVO update(TaskVO taskVO) {
	    	if (taskVO == null) {
	            throw new RequiredObjectIsNullException();
	        }
	        logger.info("Updating one task!");
	        List<User> members = userRepository.findAllById(taskVO.getMemberIds());
	        if (members.isEmpty()) {
	            throw new IllegalStateException("Nenhum membro encontrado para os IDs fornecidos.");
	        }
	        Project project = projectRepository.findById(taskVO.getProjectId())
	        	    .orElseThrow(() -> new IllegalStateException("Nenhum projeto encontrado para o ID fornecido."));
	        var task = repository.findById(taskVO.getKey())
	    			.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	        task.setName(taskVO.getName());
	        task.setStatus(taskVO.getStatus());
	        task.setDescription(taskVO.getDescription());
	        task.setCreator(taskVO.getCreator());
	        task.setLaunchDate(taskVO.getLaunchDate());
	        task.setDeadline(taskVO.getDeadline());
	        task.setProject(project);
	        task.setMembers(members);
	        var savedEntity = repository.save(task);

	        // Converte manualmente para TaskVO
	        var vo = new TaskVO();
	        vo.setKey(savedEntity.getId());
	        vo.setStatus(savedEntity.getStatus());
	        vo.setName(savedEntity.getName());
	        vo.setDescription(savedEntity.getDescription());
	        vo.setCreator(savedEntity.getCreator());
	        vo.setLaunchDate(savedEntity.getLaunchDate());
	        vo.setDeadline(savedEntity.getDeadline());
	        vo.setProjectId(savedEntity.getProject().getId());
	        vo.setMemberIds(
	            savedEntity.getMembers().stream()
	                .map(User::getId)
	                .collect(Collectors.toList())
	        );
	        vo.add(linkTo(methodOn(TaskController.class).findById(vo.getKey())).withSelfRel());
	        return vo;
	    }
	    
	    @Transactional
	    public TaskVO updateStatus(Long id, String status) {
	        
	        logger.info("Updating the status of a task!");

	        // Atualizar o status da task
	        repository.updateStatus(id, status);

	        // Buscar a task atualizada
	        var entity = repository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	        
	        // Mapear a task para TaskVO
	        var vo = DozerMapper.mapTaskToTaskVO(entity);
	        vo.add(linkTo(methodOn(TaskController.class).findById(id)).withSelfRel());
	        
	        return vo;
	    }


	    
	    public void delete(Long id) {
	        logger.info("Deleting one Task!");
	        var entity = repository.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	        entity.setProject(null);
	        entity.getMembers().clear();
	        repository.save(entity);
	        repository.delete(entity);
	    }	 
}
