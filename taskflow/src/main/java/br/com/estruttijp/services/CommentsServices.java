package br.com.estruttijp.services;

import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.estruttijp.data.vo.v1.CommentsVO;
import br.com.estruttijp.exceptions.ResourceNotFoundException;
import br.com.estruttijp.model.Comments;
import br.com.estruttijp.repositories.CommentsRepository;
import br.com.estruttijp.repositories.TaskRepository;
import br.com.estruttijp.repositories.UserRepository;

@Service
public class CommentsServices {

	private Logger logger = Logger.getLogger(CommentsServices.class.getName());
	
	@Autowired
	private CommentsRepository repository;
	
	@Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public CommentsVO addComment(CommentsVO commentVO) {
    	logger.info("Adding comment!");
    	
        if (commentVO.getTaskId() == null || commentVO.getUserId() == null || commentVO.getComment() == null) {
            throw new IllegalArgumentException("Task ID, User ID e o comentário são obrigatórios.");
        }

        var task = taskRepository.findById(commentVO.getTaskId())
        		.orElseThrow(() -> new ResourceNotFoundException("Task não encontrada para o ID fornecido."));
        var user = userRepository.findById(commentVO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User não encontrado para o ID fornecido."));

        var comment = new Comments();
        comment.setTask(task);
        comment.setUser(user);
        comment.setComment(commentVO.getComment());

        var savedComment = repository.save(comment);

        // Converte para VO
        var vo = new CommentsVO();
        vo.setKey(savedComment.getId());
        vo.setTaskId(savedComment.getTask().getId());
        vo.setUserId(savedComment.getUser().getId());
        vo.setComment(savedComment.getComment());
        vo.setCreatedAt(savedComment.getCreatedAt());

        return vo;
    }

    @Transactional(readOnly = true)
    public List<CommentsVO> findCommentsByTask(Long taskId) {
    	logger.info("Finding all comments!");
        var comments = repository.findByTaskId(taskId);
        return comments.stream().map(comment -> {
            var vo = new CommentsVO();
            vo.setKey(comment.getId());
            vo.setTaskId(comment.getTask().getId());
            vo.setUserId(comment.getUser().getId());
            vo.setComment(comment.getComment());
            vo.setCreatedAt(comment.getCreatedAt());
            return vo;
        }).collect(Collectors.toList());
    }
}
