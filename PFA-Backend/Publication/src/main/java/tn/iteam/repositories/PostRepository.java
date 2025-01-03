package tn.iteam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.iteam.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
