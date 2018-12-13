package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.AgeGender;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Интерфейс описывающий основные методы для работы с сущностью AgeGender
 */
public interface IAgeGenderRepository extends JpaRepository<AgeGender, Integer> {
}
