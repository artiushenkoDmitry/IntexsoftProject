package by.intexsoft.artiushenko.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import by.intexsoft.artiushenko.entity.Order;
public interface OrderRepository extends JpaRepository<Order, Integer>{
}
