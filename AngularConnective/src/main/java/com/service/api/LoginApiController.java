package com.service.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.service.dto.UserDto;
import com.service.entity.LoginService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginApiController {
	@Autowired
	LoginService loginServices; 
	
	@PostMapping("/register")
	public String register(@RequestBody UserDto userDetailsDTO) {
		loginServices.addUser(userDetailsDTO);
		return "Created Successfully";
	}
}