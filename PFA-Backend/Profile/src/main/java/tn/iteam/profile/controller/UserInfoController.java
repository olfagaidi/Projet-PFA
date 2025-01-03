package tn.iteam.profile.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iteam.profile.entities.UserInfo;
import tn.iteam.profile.service.UserInfoService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin( origins = "http://localhost:3000")
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/{id}")
    public ResponseEntity<UserInfo> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userInfoService.getUserById());
    }
    @PutMapping("/{id}")
    public ResponseEntity<UserInfo> updateUser(@PathVariable Long id, @RequestBody UserInfo userInfo){
        return ResponseEntity.ok(userInfoService.updateUser(id, userInfo));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<UserInfo> deleteUser(@PathVariable Long id){
        userInfoService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
