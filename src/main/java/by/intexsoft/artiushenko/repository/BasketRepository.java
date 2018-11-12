package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Этот репозиторий - кандидат на удаление
 */
public interface BasketRepository extends JpaRepository<Basket, Integer> {
}
