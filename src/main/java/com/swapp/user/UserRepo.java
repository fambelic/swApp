package com.swapp.security.user;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface UserRepo extends MongoRepository<user, String> {

	

	@Query("{username: ?0}")
	public user findByUsername(String username);

	@Query("{email: ?0}")
	public user findByEmail(String email);
/*	@Query("{email: ?0, password: ?1}")
	public user findByUsernameAndPassword(String email, String password);*/
}
