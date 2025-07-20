package com.zosh.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.models.Reel;
import com.zosh.models.User;
import com.zosh.repository.ReelRepository;
import com.zosh.service.ReelService;
import com.zosh.service.UserService;

@Service
public class ReelServiceImpl implements ReelService{

	
	@Autowired
	private ReelRepository reelRepository;
	
	@Autowired
	private UserService userService;
	
	
	@Override
	public Reel createReel(Reel reel, User user) {
		Reel createReel = new Reel();
		createReel.setTitle(reel.getTitle());
		createReel.setUser(user);
		createReel.setVideo(reel.getVideo());
		return reelRepository.save(createReel);
	}

	@Override
	public List<Reel> findAll() {
		List<Reel> reels = reelRepository.findAll();
		return reels;
	}

	@Override
	public List<Reel> findUserReel(Integer userId) throws Exception {
		userService.findUserById(userId);
		return reelRepository.findByUserId(userId);
	}

	@Override
	public String deleteReel(Integer reelId, Integer userId) throws Exception {
		User user = userService.findUserById(userId);
		Reel reel = findReelById(reelId);
		
		// Kiểm tra quyền sở hữu - chỉ chủ sở hữu mới có thể xóa
		if (!reel.getUser().getId().equals(user.getId())) {
			throw new Exception("You can't delete another user's reel.");
		}
		
		// Xóa reel (vì model Reel đơn giản, không có quan hệ phức tạp)
		reelRepository.delete(reel);
		return "Reel deleted successfully";
	}

	@Override
	public Reel findReelById(Integer reelId) throws Exception {
		Optional<Reel> reel = reelRepository.findById(reelId);
		if (reel.isEmpty()) {
			throw new Exception("Reel not found with id " + reelId);
		}
		return reel.get();
	}

}
