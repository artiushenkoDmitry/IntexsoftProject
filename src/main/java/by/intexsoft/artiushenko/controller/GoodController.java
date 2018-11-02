package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Good;
import by.intexsoft.artiushenko.service.GoodService;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/")
public class GoodController {
    private static Logger log = LoggerFactory.getLogger(GoodController.class);
    @Autowired
    GoodService goodService;
    @GetMapping
    public List<Good> getAll(){
        log.info("=====>Мы в методе getAll GoodController-а<=====");
        List<Good> goods = goodService.findAll();
        return goods;
    }

    @PostMapping
    public Good create(@RequestBody Good good) {
        return goodService.create(good);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete good with id: {}", id);
        goodService.delete(id);
    }

    @CrossOrigin
    @GetMapping("/select/{id}")
    public Good selectOne(@PathVariable("id") int id){
        log.info("=====>Мы в методе selectOne GoodController-а<=====");
        Good good =goodService.select(id);
        return good;
    }

//    @CrossOrigin
//    @GetMapping("/yum")
//    public Good yum(){
//        return goodService.yum();
//    }
}
