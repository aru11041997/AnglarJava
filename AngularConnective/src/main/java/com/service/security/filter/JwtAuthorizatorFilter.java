package com.service.security.filter;

import java.io.IOException;



import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

 

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.service.entity.UserEntity;
import com.service.repository.UserRepo;
import com.service.security.JwtProperties;
import com.service.services.security.LoginPrincipal;

public class JwtAuthorizatorFilter extends BasicAuthenticationFilter {

	
	
	private UserRepo userDetailsRepo;
    public JwtAuthorizatorFilter(AuthenticationManager authenticationManager,UserRepo userRepository) {
        super(authenticationManager);
        this.userDetailsRepo=userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String header=request.getHeader(JwtProperties.HEADER_STRING);
        if(header==null||!header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }
        Authentication auth=getAuth(request);
        SecurityContextHolder.getContext().setAuthentication(auth);
        chain.doFilter(request, response);
    }
    
    
    private Authentication getAuth(HttpServletRequest request) {
        String header=request.getHeader(JwtProperties.HEADER_STRING);
        if(header!=null) {
            String username=JWT
                    .require(Algorithm.HMAC512(JwtProperties.SECRET.getBytes()))
                    .build()
                    .verify(header.replace(JwtProperties.TOKEN_PREFIX, ""))
                    .getSubject();
            if(username!=null) {
                UserEntity user=userDetailsRepo.findByUsername(username);
                LoginPrincipal principal=new LoginPrincipal(user);
                return new UsernamePasswordAuthenticationToken(username, null,principal.getAuthorities());
            }
        }
        return null;
    }
}
