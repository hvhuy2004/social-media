package com.zosh.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.models.Post;
import com.zosh.models.User;
import com.zosh.repository.PostRepository;
import com.zosh.repository.UserRepository;
import com.zosh.service.PostService;
import com.zosh.service.UserService;

@Service
public class PostServiceImpl implements PostService{

	
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public Post createNewPost(Post post, Integer userId) throws Exception {
		
		User user = userService.findUserById(userId);
		Post newPost = new Post();
		newPost.setCaption(post.getCaption());
		newPost.setImage(post.getImage());
		newPost.setCreatedAt(LocalDateTime.now());
		newPost.setVideo(post.getVideo());
		newPost.setUser(user);
		return postRepository.save(newPost);
	}

	@Override
	public String deletePost(Integer postId, Integer userId) throws Exception {
		User user = userService.findUserById(userId);
		Post post = findPostById(postId);

		if (!post.getUser().getId().equals(user.getId())) {
			throw new Exception("You can't delete another user's post.");
		}

		// Xóa post khỏi savedPost của tất cả user
		List<User> allUsers = userRepository.findAll();
		for (User u : allUsers) {
			if (u.getSavedPost().contains(post)) {
				u.getSavedPost().remove(post);
				userRepository.save(u);
			}
		}

		// Xóa post
		postRepository.delete(post);
		return "Post deleted successfully";
	}

	@Override
	public List<Post> findPostByUserId(Integer userId) {
		
		return postRepository.findPostByUserId(userId);
	}

	@Override
	public Post findPostById(Integer postId) throws Exception {
		Optional<Post> post = postRepository.findById(postId);
		if (post.isEmpty()) {
			throw new Exception("Post not found with id " + postId);
		}
		return post.get();
	}

	@Override
	public List<Post> findAllPost() {
		
		return postRepository.findAll();
	}

	@Override
	public Post savedPost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if (user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
		}
		else {
			user.getSavedPost().add(post);
		}
		userRepository.save(user);
		return post;
	}

	@Override
	public Post likePost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if (post.getLiked().contains(user)) {
			post.getLiked().remove(user);
		}
		else {
			post.getLiked().add(user);
		}
		return postRepository.save(post);
	}

}
