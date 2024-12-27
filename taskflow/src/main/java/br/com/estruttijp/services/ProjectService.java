package br.com.estruttijp.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import org.springframework.stereotype.Service;

import br.com.estruttijp.controller.ProjectController;
import br.com.estruttijp.data.vo.v1.ProjectVO;
import br.com.estruttijp.exceptions.RequiredObjectIsNullException;
import br.com.estruttijp.exceptions.ResourceNotFoundException;
import br.com.estruttijp.mapper.DozerMapper;
import br.com.estruttijp.model.Project;
import br.com.estruttijp.repositories.ProjectRepository;

@Service
public class ProjectService {

    private Logger logger = Logger.getLogger(ProjectService.class.getName());

    @Autowired
    ProjectRepository repository;

    public List<ProjectVO> findAll() {

        logger.info("Finding all projects!");

        var projects = DozerMapper.parseListObjects(repository.findAll(), ProjectVO.class);
        projects
                .stream()
                .forEach(p -> p.add(linkTo(methodOn(ProjectController.class).findById(p.getKey())).withSelfRel()));
        return projects;
    }

    public ProjectVO findById(Long id) {

        logger.info("Finding one project!");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
        var vo = DozerMapper.parseObject(entity, ProjectVO.class);
        vo.add(linkTo(methodOn(ProjectController.class).findById(id)).withSelfRel());
        return vo;
    }

    public ProjectVO create(ProjectVO projectVO) {
        if (projectVO == null) {
            throw new RequiredObjectIsNullException();
        }
        logger.info("Creating one project!");
        var entity = DozerMapper.parseObject(projectVO, Project.class);
        var vo = DozerMapper.parseObject(repository.save(entity), ProjectVO.class);
        vo.add(linkTo(methodOn(ProjectController.class).findById(vo.getKey())).withSelfRel());
        return vo;
    }

    public ProjectVO update(ProjectVO projectVO) {
        if (projectVO == null) {
            throw new RequiredObjectIsNullException();
        }
        logger.info("Updating one project!");
        var entity = repository.findById(projectVO.getKey())
                .orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
        entity.setName(projectVO.getName());
        entity.setDescription(projectVO.getDescription());
        entity.setCreator(projectVO.getCreator());
        entity.setLaunchDate(projectVO.getLaunchDate());
        entity.setDeadline(projectVO.getDeadline());
        var vo = DozerMapper.parseObject(repository.save(entity), ProjectVO.class);
        vo.add(linkTo(methodOn(ProjectController.class).findById(vo.getKey())).withSelfRel());
        return vo;
    }

    public void delete(Long id) {
        logger.info("Deleting one project!");
        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
        repository.delete(entity);
    }

}
