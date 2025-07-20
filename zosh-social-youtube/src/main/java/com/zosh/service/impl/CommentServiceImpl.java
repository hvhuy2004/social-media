package com.zosh.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.models.Comment;
import com.zosh.models.Post;
import com.zosh.models.User;
import com.zosh.repository.CommentRepository;
import com.zosh.repository.PostRepository;
import com.zosh.service.CommentService;
import com.zosh.service.PostService;
import com.zosh.service.UserService;


@Service
public class CommentServiceImpl implements CommentService{

	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Override
	public Comment createComment(Comment comment, 
			Integer postId, 
			Integer userId) throws Exception {
		
		User user = userService.findUserById(userId);
		
		Post post = postService.findPostById(postId);
		
		comment.setUser(user);
		comment.setContent(comment.getContent());
		comment.setCreateAt(LocalDateTime.now());
		comment.setPost(post);
		
		Comment savedComment = commentRepository.save(comment);
		
		post.getComments().add(savedComment);
		
		postRepository.save(post);
		return savedComment;
	}

	@Override
	public Comment likeComment(Integer commentId, Integer userId) throws Exception {
		Comment comment = findCommentById(commentId);
		User user = userService.findUserById(userId);
		
		if (!comment.getLiked().contains(user)) {
			comment.getLiked().add(user);
		}
		else comment.getLiked().remove(user);
		
		return commentRepository.save(comment);
	}

	@Override
	public Comment findCommentById(Integer commentId) throws Exception {
		Optional<Comment> comment = commentRepository.findById(commentId);
		if (comment==null) {
			throw new Exception("comment not found with id "+ commentId); 
		}
		return comment.get();
	}

	@Override
	public Comment updateComment(Integer commentId, String newContent, Integer userId) throws Exception {
	    Comment comment = findCommentById(commentId);

	    if (!comment.getUser().getId().equals(userId)) {
	        throw new Exception("You can't update another user's comment.");
	    }

	    comment.setContent(newContent);

	    return commentRepository.save(comment);
	}
	
	@Override
	public void deleteComment(Integer commentId, Integer userId) throws Exception {
	    Comment comment = findCommentById(commentId);

	    if (!comment.getUser().getId().equals(userId)) {
	        throw new Exception("You can't delete another user's comment.");
	    }

	    Post post = comment.getPost();

	    if (post != null) {
	        post.getComments().removeIf(c -> c.getId().equals(commentId));
	        postRepository.save(post);
	    }

	    // Không cần gọi commentRepository.delete(comment);
	    // vì orphanRemoval sẽ tự động xóa
	}

}
