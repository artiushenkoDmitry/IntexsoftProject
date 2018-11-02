package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Role;
import by.intexsoft.artiushenko.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    public List<Role> findAll(){
        List<Role> list = roleRepository.findAll();
        return list;
    }

    public Role create(Role role) {
        return roleRepository.save(role);
    }

    public void delete(int id) {
        roleRepository.deleteById(id);
    }

    public Role select(Integer id) {
        return roleRepository.findById(id).get();
    }

}
