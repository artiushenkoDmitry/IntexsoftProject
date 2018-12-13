package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Интерфейс описывающий основные методы для работы с сущностью Role
 */
public interface IRoleRepository extends JpaRepository<Role, Integer> {
}