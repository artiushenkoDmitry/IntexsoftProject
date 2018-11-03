package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Basket;
import by.intexsoft.artiushenko.entity.Brand;
import by.intexsoft.artiushenko.repository.BasketRepository;
import by.intexsoft.artiushenko.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {
    @Autowired
    BrandRepository brandRepository;

    public List<Brand> findAll(){
        List<Brand> list = brandRepository.findAll();
        return list;
    }

    public Brand create(Brand brand) {
        return brandRepository.save(brand);
    }

    public void delete(int id) {
        brandRepository.deleteById(id);
    }

    public Brand select(Integer id) {
        return brandRepository.findById(id).get();
    }

}
