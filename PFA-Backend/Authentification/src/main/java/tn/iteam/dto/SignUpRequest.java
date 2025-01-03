package tn.iteam.dto;

import lombok.Data;

@Data
public class SignUpRequest {
    private String email;
    private String firstname;
    private String secondname;
    private String username;
    private String password;
    private String repassword;

}
