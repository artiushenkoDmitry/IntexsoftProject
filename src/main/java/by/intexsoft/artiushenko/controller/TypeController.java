package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Type;
import by.intexsoft.artiushenko.service.TypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/type")
public class TypeController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    TypeService typeService;

    @GetMapping
    public List<Type> getAll() {
        List<Type> types = typeService.findAll();
        return types;
    }

    @PostMapping
    public Type create(@RequestBody Type type) {
        return typeService.create(type);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete role with id: {}", id);
        typeService.delete(id);
    }

    @CrossOrigin
    @GetMapping("/select/{id}")
    public Type selectOne(@PathVariable("id") int id) {
        Type type = typeService.select(id);
        return type;
    }
}
