package com.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.service.entity.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity,Integer> {
	
	UserEntity findByUsername(String username);
	
}
