package com.swapp.security;

import com.swapp.UserDetailSerivice;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConf {

    JwtAuthenticationConfig config;
    @Autowired
    UserDetailSerivice userDetailSerivice;
    public SecurityConf(){
        config=new JwtAuthenticationConfig();
    }
    @Autowired
    UserDetailSerivice userDetailsService;
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder bCryptPasswordEncoder)
            throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder)
                .and()
                .build();
    }

    @Bean
    public SecurityFilterChain configuration(HttpSecurity http) throws Exception {
        http.csrf().disable().
             formLogin().loginPage("/login").and().
             logout().disable().
             sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).
             and().
             anonymous().
             and().
             exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED))
            .and()
            .authorizeHttpRequests().requestMatchers("/login","/home").permitAll().anyRequest().authenticated();

        http.addFilterAfter(new JwtUsernamePasswordAuthenticationFilter(null, authenticationManager(http, passwordEncoder())),UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
