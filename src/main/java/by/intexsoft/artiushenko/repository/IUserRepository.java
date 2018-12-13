package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.User;
import by.intexsoft.artiushenko.entity.VendorCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Интерфейс описывающий основные методы для работы с сущностью User
 */
public interface IUserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    /**
     * Возвращает сущность user по его роли
     * @param roleId - идентификатор роли
     * @return - возвращает сущность user по его роли
     */
    @Query("FROM User user WHERE user.role.id=:roleId")
    List<User> getUserListByRoleId(@Param("roleId") int roleId);
}
