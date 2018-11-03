package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Order;
import by.intexsoft.artiushenko.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    OrderService orderService;

    @GetMapping
    public List<Order> getAll() {
        List<Order> orders = orderService.findAll();
        return orders;
    }

    @PostMapping
    public Order create(@RequestBody Order order) {
        return orderService.create(order);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete role with id: {}", id);
        orderService.delete(id);
    }

    @CrossOrigin
    @GetMapping("/select/{id}")
    public Order selectOne(@PathVariable("id") int id) {
        Order order = orderService.select(id);
        return order;
    }
}
