package tn.iteam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import tn.iteam.dto.JwtAuthenticationResponse;
import tn.iteam.dto.LoginRequest;
import tn.iteam.entities.Role;
import tn.iteam.entities.User;
import tn.iteam.repositories.UserRepository;

@SpringBootApplication
@EnableDiscoveryClient
public class AuthentificationApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(AuthentificationApplication.class, args);
    }

    public void run(String... args){
        User adminAccount = userRepository.findByRole(Role.Admin);
        if (null == adminAccount){
            User user = new User();

            user.setEmail("admin@gmail.com");
            user.setFirstname("admin");
            user.setSecondname("admin");
            user.setRole(Role.Admin);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            user.setRepassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(user);

        }else {
            User user = new User();

            user.setEmail("khalil@gmail.com");
            user.setFirstname("khalil");
            user.setSecondname("ben ahmed");
            user.setRole(Role.User);
            user.setPassword(new BCryptPasswordEncoder().encode("khalil"));
            user.setRepassword(new BCryptPasswordEncoder().encode("khalil"));
            userRepository.save(user);
        }
    }


}
