package com.zosh.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.zosh.config.JwtProvider;
import com.zosh.models.User;
import com.zosh.repository.UserRepository;
import com.zosh.service.UserService;


@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserRepository userRepository;
	
	@Override
	public User registerUser(User user) {
		User newUser = new User();
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(user.getPassword());
		newUser.setId(user.getId());
		
		User savedUser = userRepository.save(newUser);
		return savedUser;
	}

	@Override
	public User findUserById(Integer userId) throws Exception {
		Optional<User> user = userRepository.findById(userId);
		
		if (user.isPresent()) {
			return user.get();
		}
		throw new Exception("user not exist with userid : " + userId);
	}

	@Override
	public User findUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		return user;
	}

	@Override
	public User followUser(Integer reqUserId, Integer userId2) throws Exception{
		User reqUser = findUserById(reqUserId);
		User user2 = findUserById(userId2);
		
		user2.getFollowers().add(reqUser);
		reqUser.getFollowings().add(user2);
		
		userRepository.save(reqUser);
		userRepository.save(user2);
		return reqUser;
	}
	
	@Override
	public User unfollowUser(Integer userId1, Integer userId2) throws Exception {
	    User user1 = findUserById(userId1); // người bỏ follow
	    User user2 = findUserById(userId2); // người bị bỏ follow

	    user2.getFollowers().remove(user1);
	    user1.getFollowings().remove(user2);

	    userRepository.save(user1);
	    userRepository.save(user2);

	    return user1;
	}

	@Override
	public User updateUser(User user, Integer userId) throws Exception {
		Optional<User> user1 = userRepository.findById(userId);
		
		if (user1.isEmpty()) {
			throw new Exception("user not exist with id " + userId);
		}
		
		User oldUser = user1.get();

		if (user.getFirstName()!=null) {
			oldUser.setFirstName(user.getFirstName());
		}
		
		if (user.getLastName()!=null) {
			oldUser.setLastName(user.getLastName());
		}
		
		if (user.getEmail()!=null) {
			oldUser.setEmail(user.getEmail());
		}
		
		User updatedUser = userRepository.save(oldUser);
		return updatedUser;
	}

	@Override
	public List<User> searchUser(String query) {
		// TODO Auto-generated method stub
		return userRepository.searchUser(query);
	}

	@Override
	public User findUserByJwt(String jwt) {
		
		String email = JwtProvider.getEmailFromJwtToken(jwt);
		User user = userRepository.findByEmail(email);
		return user;
	}

}
