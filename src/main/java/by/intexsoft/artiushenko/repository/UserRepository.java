package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.User;
import by.intexsoft.artiushenko.entity.VendorCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Интерфейс описывающий основные методы для работы с сущьностью User
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    @Query("FROM User user WHERE user.role.id=:roleId")
    List<User> getUserListByRoleId(@Param("roleId") int roleId);
}
