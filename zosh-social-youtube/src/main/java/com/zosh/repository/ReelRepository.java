package com.zosh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.models.Reel;

public interface ReelRepository extends JpaRepository<Reel, Integer>{
	
	public List<Reel> findByUserId(Integer userId);

}
