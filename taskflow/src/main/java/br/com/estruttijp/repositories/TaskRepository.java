package br.com.estruttijp.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.estruttijp.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
	
	@Query("SELECT t FROM Task t ORDER BY " 
			+ "CASE t.status " 
			+ "WHEN 'PENDING' THEN 1 " 
			+ "WHEN 'IN_PROGRESS' THEN 2 " 
			+ "WHEN 'COMPLETED' THEN 3 " 
			+ "ELSE 4 END, t.id ASC") 
	Page<Task> findAllOrderedByStatus(Pageable pageable);
}
