package tn.iteam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.iteam.entities.Reaction;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
}
