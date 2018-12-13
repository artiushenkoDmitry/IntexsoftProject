package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Brand;
import by.intexsoft.artiushenko.repository.IBrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущностью Brand
 */
@Service
public class BrandService {
    @Autowired
    IBrandRepository IBrandRepository;

    /**
     * Возвращает список сущностей Brand
     */
    public List<Brand> findAll(){
        List<Brand> list = IBrandRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_brand)
     */
    public Brand create(Brand brand) {
        return IBrandRepository.save(brand);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_brand)
     */
    public void delete(int id) {
        IBrandRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_brand) по id
     */
    public Brand select(Integer id) {
        return IBrandRepository.findById(id).get();
    }

}
