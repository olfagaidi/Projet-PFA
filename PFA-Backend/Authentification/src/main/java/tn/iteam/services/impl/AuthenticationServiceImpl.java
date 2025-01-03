package tn.iteam.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.iteam.dto.JwtAuthenticationResponse;
import tn.iteam.dto.LoginRequest;
import tn.iteam.dto.SignUpRequest;
import tn.iteam.entities.Role;
import tn.iteam.entities.User;
import tn.iteam.repositories.UserRepository;
import tn.iteam.services.AuthenticationService;
import tn.iteam.services.JWTService;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public User signup(SignUpRequest signUpRequest){
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setFirstname(signUpRequest.getFirstname());
        user.setSecondname(signUpRequest.getSecondname());
        user.setRole(Role.User);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRepassword(passwordEncoder.encode(signUpRequest.getRepassword()));

        return userRepository.save(user);

    }

    public JwtAuthenticationResponse login(LoginRequest loginRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return  jwtAuthenticationResponse;
    }

}
