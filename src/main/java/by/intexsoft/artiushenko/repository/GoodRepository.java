package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.Good;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GoodRepository extends JpaRepository<Good, Integer> {
    @Query("FROM Good g where g.id=2")
    Good yum();
}
