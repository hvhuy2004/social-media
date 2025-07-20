package com.zosh.service;

import java.util.List;

import com.zosh.models.Reel;
import com.zosh.models.User;

public interface ReelService {
	
	public Reel createReel(Reel reel, User user);
	
	public List<Reel> findAll();
	
	public List<Reel> findUserReel(Integer userId) throws Exception;
	
	public String deleteReel(Integer reelId, Integer userId) throws Exception;
	
	public Reel findReelById(Integer reelId) throws Exception;

}
