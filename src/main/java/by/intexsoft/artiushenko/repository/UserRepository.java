package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
