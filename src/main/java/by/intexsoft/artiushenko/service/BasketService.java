package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Basket;
import by.intexsoft.artiushenko.repository.BasketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Этот сервис кандидат на удаление
 */
@Service
public class BasketService {
    @Autowired
    BasketRepository basketRepository;

    public List<Basket> findAll(){
        List<Basket> list = basketRepository.findAll();
        return list;
    }

    public Basket create(Basket basket) {
        return basketRepository.save(basket);
    }

    public void delete(int id) {
        basketRepository.deleteById(id);
    }

    public Basket select(Integer id) {
        return basketRepository.findById(id).get();
    }

}
