package tn.iteam.services;

import org.hibernate.annotations.SecondaryRow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iteam.entities.Profile;
import tn.iteam.repositories.ProfileRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;
    public List<Profile> getAllUsers(){
        return profileRepository.findAll();
    }
    public Profile getUserById(){
        return profileRepository.findById(getUserById().getId()).orElseThrow(() -> new RuntimeException("User not found"));

    }



    public Profile updateUser(Long id , Profile updateUser){
        Profile profile = getUserById();
        profile.setName(updateUser.getName());
        profile.setEmail(updateUser.getEmail());
        profile.setPhone(updateUser.getPhone());
        profile.setAddress(updateUser.getAddress());
        profile.setDate(updateUser.getDate());
        profile.setPoste(updateUser.getPoste());
        profile.setProfileImage(updateUser.getProfileImage());
        return profileRepository.save(profile);

    }

    public void deleteUser(Long id){
        profileRepository.deleteById(id);
    }





}
