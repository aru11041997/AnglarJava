package com.service.services.security;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.service.entity.UserEntity;

public class LoginPrincipal implements UserDetails {

	private UserEntity userDetail;
	
	public LoginPrincipal() {}
	
	public LoginPrincipal(UserEntity userDetail) {
		super();
		this.userDetail = userDetail;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		final List<SimpleGrantedAuthority> authorities = new LinkedList<>();
        SimpleGrantedAuthority authority=userDetail.getRole().equals("Admin")?
                new SimpleGrantedAuthority("ROLE_ADMIN"):
                    new SimpleGrantedAuthority("ROLE_USER");
                authorities.add(authority);
                
        return authorities;
	}

	@Override
	public String getPassword() {
		return userDetail.getPassword();
	}

	@Override
	public String getUsername() {
		return userDetail.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public String getRole() {
		return userDetail.getRole();
	}

}
