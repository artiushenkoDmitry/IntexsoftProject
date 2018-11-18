package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Brand;
import by.intexsoft.artiushenko.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущьностью Brand
 */
@Service
public class BrandService {
    @Autowired
    BrandRepository brandRepository;

    /**
     * Возвращает список сущьностей Brand
     */
    public List<Brand> findAll(){
        List<Brand> list = brandRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_brand)
     */
    public Brand create(Brand brand) {
        return brandRepository.save(brand);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_brand)
     */
    public void delete(int id) {
        brandRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_brand) по id
     */
    public Brand select(Integer id) {
        return brandRepository.findById(id).get();
    }

}
