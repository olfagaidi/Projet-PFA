package tn.iteam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.iteam.entities.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    boolean existsByName(String name);
    Event findByName(String name);
}
