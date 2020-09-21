package com.service.services.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.service.entity.UserEntity;
import com.service.repository.UserRepo;

@Service
public class LoginSecurityService implements UserDetailsService {

	@Autowired
	UserRepo repo;
	
	@Override
	public UserDetails loadUserByUsername(String username){
		UserEntity userDetails=repo.findByUsername(username);
		
		if(userDetails==null)
			throw new UsernameNotFoundException("User Not Found");
		
		return new LoginPrincipal(userDetails);
	}
	
}