package br.com.estruttijp.services;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;

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
    
    @Autowired
	PagedResourcesAssembler<ProjectVO> assembler;

    public PagedModel<EntityModel<ProjectVO>> findAll(Pageable pageable) {

        logger.info("Finding all projects!");

        var projectPage = repository.findAll(pageable);

		var projectVosPage = projectPage.map(p -> DozerMapper.parseObject(p, ProjectVO.class));
		projectVosPage.map(
			p -> p.add(
				linkTo(methodOn(ProjectController.class)
					.findById(p.getKey())).withSelfRel()));
		
		Link link = linkTo(
			methodOn(ProjectController.class)
				.findAll(pageable.getPageNumber(),
						pageable.getPageSize(),
						"asc")).withSelfRel();
		
		return assembler.toModel(projectVosPage, link);
    }

    public PagedModel<EntityModel<ProjectVO>> findProjectByName(String name, Pageable pageable) {
		
		logger.info("Finding all projects!");
		
		var projectPage = repository.findProjectsByName(name, pageable);
		
		var projectVosPage = projectPage.map(p -> DozerMapper.parseObject(p, ProjectVO.class));
		projectVosPage.map(
			p -> p.add(
				linkTo(methodOn(ProjectController.class)
					.findById(p.getKey())).withSelfRel()));
		
		Link link = linkTo(
			methodOn(ProjectController.class)
				.findAll(pageable.getPageNumber(),
						pageable.getPageSize(),
						"asc")).withSelfRel();
		
		return assembler.toModel(projectVosPage, link);
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
