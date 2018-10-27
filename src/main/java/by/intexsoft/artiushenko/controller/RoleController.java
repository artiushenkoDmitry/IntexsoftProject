package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Role;
import by.intexsoft.artiushenko.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/role")
public class RoleController {
    private static Logger log = LoggerFactory.getLogger(GoodController.class);
    @Autowired
    RoleService roleService;

    @GetMapping
    public List<Role> getAll() {
        log.info("Show all");
        List<Role> roles = roleService.findAll();
        return roles;
    }

    @PostMapping
    public Role create(@RequestBody Role role) {
        return roleService.create(role);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete role with id: {}", id);
        roleService.delete(id);
    }

    @CrossOrigin
    @GetMapping("/select/{id}")
    public Role selectOne(@PathVariable("id") int id) {
        Role role = roleService.select(id);
        return role;
    }
}
