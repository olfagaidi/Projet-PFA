package tn.iteam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iteam.entities.Profile;
import tn.iteam.services.ProfileService;



@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(profileService.getUserById());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateUser(@PathVariable Long id, @RequestBody Profile profile){
        return ResponseEntity.ok(profileService.updateUser(id, profile));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Profile> deleteUser(@PathVariable Long id){
        profileService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }




}
