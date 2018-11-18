package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Role;
import by.intexsoft.artiushenko.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущьностью Role
 */
@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    /**
     * Возвращает список сущьностей role
     */
    public List<Role> findAll(){
        List<Role> list = roleRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_role)
     */
    public Role create(Role role) {
        return roleRepository.save(role);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_role)
     */
    public void delete(int id) {
        roleRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_order) по id
     */
    public Role select(Integer id) {
        return roleRepository.findById(id).get();
    }

}
