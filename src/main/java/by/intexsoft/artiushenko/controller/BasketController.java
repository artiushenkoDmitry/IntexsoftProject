package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Basket;
import by.intexsoft.artiushenko.service.BasketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Этот контроллер - кандидат на удаление.
 */
@CrossOrigin
@RestController
@RequestMapping("/basket")
public class BasketController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    BasketService basketService;

    @GetMapping
    public List<Basket> getAll() {
        List<Basket> baskets = basketService.findAll();
        return baskets;
    }

    @PostMapping
    public Basket create(@RequestBody Basket basket) {
        return basketService.create(basket);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete role with id: {}", id);
        basketService.delete(id);
    }

    @CrossOrigin
    @GetMapping("/select/{id}")
    public Basket selectOne(@PathVariable("id") int id) {
        Basket basket = basketService.select(id);
        return basket;
    }
}
