package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Type;
import by.intexsoft.artiushenko.repository.ITypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущностью Type
 */
@Service
public class TypeService {
    @Autowired
    ITypeRepository ITypeRepository;

    /**
     * Возвращает список сущностей type
     */
    public List<Type> findAll(){
        List<Type> list = ITypeRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_type)
     */
    public Type create(Type type) {
        return ITypeRepository.save(type);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_type)
     */
    public void delete(int id) {
        ITypeRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_type) по id
     */
    public Type select(Integer id) {
        return ITypeRepository.findById(id).get();
    }
}
