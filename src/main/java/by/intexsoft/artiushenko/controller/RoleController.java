package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Role;
import by.intexsoft.artiushenko.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Контроллер содержащий методы для работы с сущьностью Role
 */
@CrossOrigin
@RestController
@RequestMapping("/role")
public class RoleController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    RoleService roleService;

    /**
     * Возвращает список сущьностей role
     */
    @GetMapping
    public List<Role> getAll() {
        List<Role> roles = roleService.findAll();
        return roles;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_role)
     */
    @PostMapping
    public Role create(@RequestBody Role role) {
        return roleService.create(role);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_role)
     */
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        roleService.delete(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_order) по id
     */
    @CrossOrigin
    @GetMapping("/select/{id}")
    public Role selectOne(@PathVariable("id") int id) {
        Role role = roleService.select(id);
        return role;
    }
}
