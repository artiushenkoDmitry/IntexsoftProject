package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Интерфейс описывающий основные методы для работы с сущностью Type
 */
public interface ITypeRepository extends JpaRepository<Type, Integer>{
}
