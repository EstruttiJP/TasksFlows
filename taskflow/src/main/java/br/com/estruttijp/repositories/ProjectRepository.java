package br.com.estruttijp.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.estruttijp.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	
	@Query("SELECT p FROM Project p WHERE p.name LIKE LOWER(CONCAT ('%',:name,'%'))")
	Page<Project> findProjectsByName(@Param("name") String name, Pageable pageable);
	
}
