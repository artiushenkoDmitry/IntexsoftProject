package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Order;
import by.intexsoft.artiushenko.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public List<Order> findAll(){
        List<Order> list = orderRepository.findAll();
        return list;
    }

    public Order create(Order order) {
        return orderRepository.save(order);
    }

    public void delete(int id) {
        orderRepository.deleteById(id);
    }

    public Order select(Integer id) {
        return orderRepository.findById(id).get();
    }

}
