package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Order;
import by.intexsoft.artiushenko.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;

/**
 * Контроллер содержащий методы для работы с сущностью Order
 */
@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    OrderService orderService;

    /**
     * Возвращает список сущностей order
     */
    @GetMapping
    public List<Order> getAll() {
        List<Order> orders = orderService.findAll();
        return orders;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_order)
     */
    @PostMapping
    public Order create(@RequestBody Order order) {
        return orderService.create(order);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_order)
     */
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        orderService.delete(id);
    }

    /**
     * Высылает письмо покупателю о том, что его заказ подтверждени и удаляет соответствующую запись из
     * даблицы заказов.
     */
    @CrossOrigin
    @DeleteMapping("/deleteAndSendMessage/{id}")
    public void deleteAndSendMessage(@PathVariable("id") int id) {
        orderService.deleteAndSendMessage(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_order) по id
     */
    @CrossOrigin
    @GetMapping("/select/{id}")
    public Order selectOne(@PathVariable("id") int id) {
        Order order = orderService.select(id);
        return order;
    }
}
