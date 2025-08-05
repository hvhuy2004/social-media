package com.zosh.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve files từ project uploads folder
        String projectPath = System.getProperty("user.dir");
        String uploadPath = "file:" + projectPath + "/uploads/";
        
        System.out.println("Configuring static resource handler:");
        System.out.println("URL pattern: /uploads/**");
        System.out.println("File location: " + uploadPath);
        
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadPath);
    }
}