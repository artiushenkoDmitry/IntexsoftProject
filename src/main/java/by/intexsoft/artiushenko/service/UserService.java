package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.User;
import by.intexsoft.artiushenko.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    private static Logger log = LoggerFactory.getLogger(UserService.class);

    public User findByUsername(String username) {
        log.info("=====>Мы в методе findByUsername UserService-а <=====");
        log.info("=====>username = " + username + " <=====");
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> findAll() {
        List<User> list = userRepository.findAll();
        return list;
    }

    //    public User create(User user) {
//        return userRepository.save(user);
//    }
    public User create(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void delete(int id) {
        userRepository.deleteById(id);
    }

    public User select(Integer id) {
        return userRepository.findById(id).get();
    }
}
