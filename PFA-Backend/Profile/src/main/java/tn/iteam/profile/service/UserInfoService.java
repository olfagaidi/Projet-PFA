package tn.iteam.profile.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iteam.profile.Repositoy.UserInfoRepository;
import tn.iteam.profile.entities.UserInfo;

import java.util.List;

@Service
public class UserInfoService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    public List<UserInfo> getAllUsers(){
        return userInfoRepository.findAll();
    }
    public UserInfo getUserById(){
        return userInfoRepository.findById(getUserById().getId()).orElseThrow(() -> new RuntimeException("User not found"));

    }
    public UserInfo createUser(UserInfo userInfo){
        return userInfoRepository.save(userInfo);
    }

    public UserInfo updateUser(Long id , UserInfo updateUser){
        UserInfo userInfo = getUserById();
        userInfo.setName(updateUser.getName());
        userInfo.setEmail(updateUser.getEmail());
        userInfo.setPhone(updateUser.getPhone());
        userInfo.setAddress(updateUser.getAddress());
        userInfo.setDate(updateUser.getDate());
        userInfo.setPoste(updateUser.getPoste());
        userInfo.setProfileImage(updateUser.getProfileImage());
        return userInfoRepository.save(userInfo);

    }

    public void deleteUser(Long id){
        userInfoRepository.deleteById(id);
    }
}
