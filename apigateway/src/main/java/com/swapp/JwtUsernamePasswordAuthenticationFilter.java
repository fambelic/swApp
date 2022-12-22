package com.swapp.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swapp.user;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;
import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter{

       private final JwtAuthenticationConfig config;
        private final ObjectMapper mapper;
        private user u;

        public JwtUsernamePasswordAuthenticationFilter(JwtAuthenticationConfig config, AuthenticationManager authManager) {
            super(new AntPathRequestMatcher("/login", "POST"));
            setAuthenticationManager(authManager);
            this.config = config;
            this.mapper = new ObjectMapper();
        }


        protected void successfulAuthentication(HttpServletResponse rsp,
                                                Authentication auth) {
            System.out.println("successful authentication ");

            Instant now = Instant.now();

            String token = Jwts.builder()
                    .setSubject(u.getEmail())
                    .claim("authorities", auth.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                    .setIssuedAt(Date.from(now))
                    .setExpiration(Date.from(now.plusSeconds(config.getExpiration())))
                    .signWith(SignatureAlgorithm.HS256, config.getSecret().getBytes())
                    .compact();
            rsp.addHeader(config.getHeader(), config.getPrefix() + " " + token);
        }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        System.out.println("attempt authentication");
        u = mapper.readValue(request.getInputStream(), user.class);
        Authentication auth=getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(
                u.getEmail(), u.getPassword(), Collections.emptyList()
        ));
        if(auth.isAuthenticated()) successfulAuthentication(response,auth);
        return auth;
    }
}
