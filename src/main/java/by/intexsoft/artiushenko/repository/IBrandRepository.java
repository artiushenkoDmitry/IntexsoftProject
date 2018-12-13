package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Интерфейс описывающий основные методы для работы с сущностью Brand
 */
public interface IBrandRepository extends JpaRepository<Brand, Integer>{
}
