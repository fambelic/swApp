package com.swapp.security.user;

import lombok.Setter;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Setter
@Document
public class user {



	@NotNull
	@Indexed(unique=true)
	private String email;

	@NotNull
	private String password;

	@NotNull
	private String username;


	public String getEmail() {
		return email;
	}

	public String getUsername(){return username;}
	public String getPassword() {
		return password;
	}

	
	
}


