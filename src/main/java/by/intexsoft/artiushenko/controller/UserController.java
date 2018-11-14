package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Role;
import by.intexsoft.artiushenko.entity.User;
import by.intexsoft.artiushenko.service.RoleService;
import by.intexsoft.artiushenko.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    private static Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    UserService userService;

    @GetMapping("/getUserListByRoleId/{id}")
    public List<User> getUserListByRoleId(@PathVariable("id") int id) {
        return userService.getUserListByRoleId(id);
    }

    @GetMapping("/findByUsername/{username}")
    public User findByUsername(@PathVariable("username")String username) {
        User user = userService.findByUsername(username);
        return user;
    }

    @GetMapping
    public List<User> getAll() {
        log.info("=====>Мы в методе getAll UserController-а<=====");
        List<User> users = userService.findAll();
        return users;
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.create(user);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete user with id: {}", id);
        userService.delete(id);
    }

    @CrossOrigin
    @GetMapping("/select/{id}")
    public User selectOne(@PathVariable("id") int id) {
        return userService.select(id);
    }

}
