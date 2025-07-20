package com.zosh.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.models.Comment;
import com.zosh.models.User;
import com.zosh.service.CommentService;
import com.zosh.service.UserService;

@RestController
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/api/comments/post/{postId}")
	public Comment createComment(@RequestBody Comment comment, 
			@RequestHeader("Authorization")String jwt,
			@PathVariable("postId") Integer postId) throws Exception {
		
		User user = userService.findUserByJwt(jwt);
		
		Comment createdComment = commentService.createComment(comment, postId, user.getId());
		
		return createdComment;
	}
	
	
	@PutMapping("/api/comments/like/{commentId}")
	public Comment likeComment(@RequestHeader("Authorization")String jwt,
			@PathVariable("commentId") Integer commentId) throws Exception {
		
		User user = userService.findUserByJwt(jwt);
		
		Comment likeComment = commentService.likeComment(commentId, user.getId());
		
		return likeComment;
	}
	
	
	@DeleteMapping("/api/comments/{commentId}")
	public String deleteComment(@RequestHeader("Authorization") String jwt,
	                            @PathVariable("commentId") Integer commentId) throws Exception {
	    
	    User user = userService.findUserByJwt(jwt);
	    
	    commentService.deleteComment(commentId, user.getId());

	    return "Comment deleted successfully.";
	}

	
	@PutMapping("/api/comments/update/{commentId}")
	public Comment updateComment(
	        @PathVariable("commentId") Integer commentId,
	        @RequestHeader("Authorization") String jwt,
	        @RequestBody Map<String, String> requestBody) throws Exception {

	    User user = userService.findUserByJwt(jwt);
	    String newContent = requestBody.get("content");

	    return commentService.updateComment(commentId, newContent, user.getId());
	}
}
