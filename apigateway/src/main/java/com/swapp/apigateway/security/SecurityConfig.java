package com.swapp.apigateway.security;

import javax.servlet.http.HttpServletResponse;

import com.swapp.apigateway.user.UserDetailSerivice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserDetailSerivice userDetailsService;

    @Autowired JwtAuthenticationConfig config;

    @Bean
    public JwtAuthenticationConfig jwtConfig() {
        return new JwtAuthenticationConfig();

    }

	  @Override
	  public void configure(AuthenticationManagerBuilder builder) 
	 throws Exception {
	    builder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());;
	  }
		
	  @Bean
	  public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	  }
	  
	  @Bean
	  @Override
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("GET","POST","OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Requestor-Type"));
		configuration.setAllowedOrigins(List.of("http://localhost:8000"));
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
    		httpSecurity
                .csrf().disable()
					.cors().and().

                logout().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .anonymous()
                .and()
                    .exceptionHandling().authenticationEntryPoint(
                            (req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                .and()
                    .addFilterAfter(new JwtUsernamePasswordAuthenticationFilter(config, authenticationManager()),
                            UsernamePasswordAuthenticationFilter.class)
					.addFilterAfter(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class).
                authorizeRequests()
                .antMatchers("/annuncio/*").permitAll()
                    .anyRequest().authenticated();
    	
    }
}