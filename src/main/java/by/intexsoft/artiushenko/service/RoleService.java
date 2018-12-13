package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Role;
import by.intexsoft.artiushenko.repository.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущностью Role
 */
@Service
public class RoleService {
    @Autowired
    IRoleRepository IRoleRepository;

    /**
     * Возвращает список сущностей role
     */
    public List<Role> findAll(){
        List<Role> list = IRoleRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_role)
     */
    public Role create(Role role) {
        return IRoleRepository.save(role);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_role)
     */
    public void delete(int id) {
        IRoleRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_order) по id
     */
    public Role select(Integer id) {
        return IRoleRepository.findById(id).get();
    }

}
