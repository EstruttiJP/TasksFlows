package br.com.estruttijp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.estruttijp.model.Comments;

public interface CommentsRepository extends JpaRepository<Comments, Long>{
	List<Comments> findByTaskId(Long taskId);
}
