package br.com.estruttijp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.estruttijp.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
	@Modifying
	@Query("UPDATE Task p SET p.status = :status WHERE p.id =:id")
	void updateStatus(@Param("id") Long id, @Param("status") String status );
}
