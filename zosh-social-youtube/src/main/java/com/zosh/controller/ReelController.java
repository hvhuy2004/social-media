package com.zosh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.models.Reel;
import com.zosh.models.User;
import com.zosh.service.ReelService;
import com.zosh.service.UserService;

@RestController
public class ReelController {
	
	@Autowired
	private ReelService reelService;
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/api/reels")
	public Reel createReel(@RequestBody Reel reel,
			@RequestHeader("Authorization")String jwt) {
		
		User reqUser = userService.findUserByJwt(jwt);
		Reel createReel = reelService.createReel(reel, reqUser);
		
		return createReel;
	}
	
	@GetMapping("/api/reels")
	public List<Reel> findAllReels() {
		
		List<Reel> reels = reelService.findAll();
		
		return reels;
	}
	
	@GetMapping("/api/reels/user/{userId}")
	public List<Reel> findUserReels(@PathVariable("userId")Integer userId) throws Exception {
		
		List<Reel> reels = reelService.findUserReel(userId);
		
		return reels;
	}
	
	@DeleteMapping("/api/reels/{reelId}")
	public String deleteReel(@PathVariable("reelId") Integer reelId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User reqUser = userService.findUserByJwt(jwt);
		String result = reelService.deleteReel(reelId, reqUser.getId());
		
		return result;
	}
}
