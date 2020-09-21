package com.service.entity;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.service.dto.UserDto;
import com.service.repository.UserRepo;

@Service
public class LoginService {
	@Autowired
	UserRepo userDetailsRepo;
	
	@Autowired
	ModelMapper mapper;
	
	BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
	
	public boolean addUser(UserDto userDetailsDTO) {
		UserEntity userDetails=mapper.map(userDetailsDTO, UserEntity.class);
		userDetails.setPassword(passwordEncoder.encode(userDetails.getPassword()));
		userDetailsRepo.save(userDetails);
		return true;
	}
}
