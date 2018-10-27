package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Good;
import by.intexsoft.artiushenko.entity.User;
import by.intexsoft.artiushenko.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> findAll(){
        List<User> list = userRepository.findAll();
        return list;
    }

    public User create(User user) {
        return userRepository.save(user);
    }

    public void delete(int id) {
        userRepository.deleteById(id);
    }

    public User select(Integer id) {
        return userRepository.findById(id).get();
    }
}
