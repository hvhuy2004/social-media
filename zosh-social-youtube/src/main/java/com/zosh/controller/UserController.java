package com.zosh.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.zosh.exceptions.UserException;
import com.zosh.models.User;
import com.zosh.repository.UserRepository;
import com.zosh.service.UserService;

@RestController
public class UserController {
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    UserService userService;
    
    /**
     * Get all users
     */
    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    
    /**
     * Get user by ID
     */
    @GetMapping("/api/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") Integer id) throws UserException {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    /**
     * Update user profile - JSON only (cho firstName, lastName)
     */
    @PutMapping("/api/users")
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws UserException {
        User reqUser = userService.findUserByJwt(jwt);
        User updatedUser = userService.updateUser(user, reqUser.getId());
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    /**
     * Upload avatar only
     */
    @PostMapping("/api/users/avatar")
    public ResponseEntity<User> uploadAvatar(
            @RequestParam("avatar") MultipartFile file,
            @RequestHeader("Authorization") String jwt) throws UserException {
        
        System.out.println("=== AVATAR UPLOAD START ===");
        
        try {
            User reqUser = userService.findUserByJwt(jwt);
            System.out.println("User found: " + reqUser.getId());
            
            if (file.isEmpty()) {
                throw new UserException("File is empty");
            }
            
            String originalFileName = file.getOriginalFilename();
            System.out.println("Original file: " + originalFileName + ", Size: " + file.getSize());
            
            // Tạo thư mục upload
            String projectPath = System.getProperty("user.dir");
            String uploadPath = projectPath + File.separator + "uploads" + File.separator + "avatars";
            File uploadDir = new File(uploadPath);
            
            if (!uploadDir.exists()) {
                boolean created = uploadDir.mkdirs();
                System.out.println("Created directory: " + uploadDir.getAbsolutePath() + " - Success: " + created);
            }
            
            // Giữ tên file gốc - chỉ thêm prefix user ID để tránh conflict
            String fileName = "user_" + reqUser.getId() + "_" + originalFileName;
            File targetFile = new File(uploadDir, fileName);
            
            System.out.println("Saving to: " + targetFile.getAbsolutePath());
            
            // Lưu file
            file.transferTo(targetFile);
            System.out.println("File saved successfully");
            
            // Lưu URL để serve qua web
            String avatarUrl = "/uploads/avatars/" + fileName;
            reqUser.setAvatar(avatarUrl);
            User updatedUser = userRepository.save(reqUser);
            
            System.out.println("Avatar URL saved: " + avatarUrl);
            System.out.println("Original filename preserved: " + originalFileName);
            System.out.println("=== AVATAR UPLOAD SUCCESS ===");
            
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
            
        } catch (Exception e) {
            System.err.println("=== AVATAR UPLOAD ERROR ===");
            e.printStackTrace();
            throw new UserException("Upload failed: " + e.getMessage());
        }
    }
    
    /**
     * Follow user
     */
    @PutMapping("/api/users/follow/{userId2}")
    public ResponseEntity<User> followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws UserException {
        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.followUser(reqUser.getId(), userId2);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    /**
     * Unfollow user
     */
    @PutMapping("/api/users/unfollow/{userId2}")
    public ResponseEntity<User> unfollowUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws UserException {
        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.unfollowUser(reqUser.getId(), userId2);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    /**
     * Search users
     */
    @GetMapping("/api/users/search")
    public ResponseEntity<List<User>> searchUser(@RequestParam("query") String query) {
        List<User> users = userService.searchUser(query);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    
    /**
     * Get current user profile
     */
    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserByJwt(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    
    
    /**
     * Exception handlers
     */
    @ExceptionHandler(UserException.class)
    public ResponseEntity<Map<String, String>> handleUserException(UserException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Internal server error: " + ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}