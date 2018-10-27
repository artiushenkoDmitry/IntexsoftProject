package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Good;
import by.intexsoft.artiushenko.repository.GoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodService {
    @Autowired
    GoodRepository goodRepository;

    public List<Good> findAll(){
        List<Good> list = goodRepository.findAll();
        return list;
    }

    public Good create(Good good) {
        return goodRepository.save(good);
    }

    public void delete(int id) {
        goodRepository.deleteById(id);
    }

    public Good select(Integer id) {
        return goodRepository.findById(id).get();
    }
//    public Good yum(){
//        return goodRepository.yum();
//    }
}
