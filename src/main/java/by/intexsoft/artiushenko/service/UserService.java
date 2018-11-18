package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.User;
import by.intexsoft.artiushenko.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущьностью User
 */
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    private static Logger log = LoggerFactory.getLogger(UserService.class);

    /**
     * Возвращает пользователя по его логину.
     * org.springframework.security.core.userdetails.User - предоставляет только логин, пароль и роль пользователя.
     * Для того, чтобы получить id и имя пользователя нужен этот метод.
     */
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }


//    public User save(User user) {
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//        return userRepository.save(user);
//    }

    /**
     * Возвращает список сущьностей user
     */
    public List<User> findAll() {
        List<User> list = userRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_user)
     */
    public User create(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_user)
     */
    public void delete(int id) {
        userRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_user) по id
     */
    public User select(Integer id) {
        return userRepository.findById(id).get();
    }

    /**
     * Возвращает роль польлзователя по его id
     * @param id - идентификатор пользователя
     */
    public List<User> getUserListByRoleId (int id) {
        return userRepository.getUserListByRoleId(id);
    }
}
