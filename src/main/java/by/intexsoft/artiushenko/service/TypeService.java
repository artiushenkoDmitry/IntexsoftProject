package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Type;
import by.intexsoft.artiushenko.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущьностью Type
 */
@Service
public class TypeService {
    @Autowired
    TypeRepository typeRepository;

    /**
     * Возвращает список сущьностей type
     */
    public List<Type> findAll(){
        List<Type> list = typeRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_type)
     */
    public Type create(Type type) {
        return typeRepository.save(type);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_type)
     */
    public void delete(int id) {
        typeRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_type) по id
     */
    public Type select(Integer id) {
        return typeRepository.findById(id).get();
    }

//    public String getTest(){
//        return typeRepository.sel();
//    }
}
