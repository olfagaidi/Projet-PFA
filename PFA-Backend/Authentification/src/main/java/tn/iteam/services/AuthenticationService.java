package tn.iteam.services;

import tn.iteam.dto.JwtAuthenticationResponse;
import tn.iteam.dto.LoginRequest;
import tn.iteam.dto.SignUpRequest;
import tn.iteam.entities.User;

public interface AuthenticationService {
    User signup(SignUpRequest signUpRequest);
    JwtAuthenticationResponse login(LoginRequest loginRequest);
}
