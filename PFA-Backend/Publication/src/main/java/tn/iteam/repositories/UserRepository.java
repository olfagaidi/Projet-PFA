package tn.iteam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.iteam.entities.UserInfo;

public interface UserRepository extends JpaRepository<UserInfo, Long> {

}
