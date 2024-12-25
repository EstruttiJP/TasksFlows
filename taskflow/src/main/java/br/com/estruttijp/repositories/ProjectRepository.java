package br.com.estruttijp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.estruttijp.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {}
