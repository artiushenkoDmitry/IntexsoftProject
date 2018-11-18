package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.AgeGender;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Интерфейс описывающий основные методы для работы с сущьностью AgeGender
 */
public interface AgeGenderRepository extends JpaRepository<AgeGender, Integer> {
}
