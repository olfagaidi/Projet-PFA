package tn.iteam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.iteam.entities.Commentaire;

public interface CommentRepository extends JpaRepository<Commentaire, Long> {
}
