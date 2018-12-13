package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.User;
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

    /**
     * Возвращает роль польлзователя по его id
     * @param id - идентификатор пользователя
     */
    @GetMapping("/getUserListByRoleId/{id}")
    public List<User> getUserListByRoleId(@PathVariable("id") int id) {
        return userService.getUserListByRoleId(id);
    }

    /**
     * Возвращает пользователя по его логину.
     * org.springframework.security.core.userdetails.User - предоставляет только логин, пароль и роль пользователя.
     * Для того, чтобы получить id и имя пользователя нужен этот метод.
     */
    @GetMapping("/findByUsername/{username}")
    public User findByUsername(@PathVariable("username")String username) {
    return userService.findByUsername(username);
    }

    /**
     * Возвращает список сущностей user
     */
    @GetMapping
    public List<User> getAll() {
        return userService.findAll();
    }

    /**
     * Вносит запись в базу данных (в таблицу t_user)
     */
    @PostMapping
    public User create(@RequestBody User user) {
        return userService.create(user);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_user)
     */
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete user with id: {}", id);
        userService.delete(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_user) по id
     */
    @CrossOrigin
    @GetMapping("/select/{id}")
    public User selectOne(@PathVariable("id") int id) {
        return userService.select(id);
    }

}
