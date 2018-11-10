package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Type;
import by.intexsoft.artiushenko.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeService {
    @Autowired
    TypeRepository typeRepository;

    public List<Type> findAll(){
        List<Type> list = typeRepository.findAll();
        return list;
    }

    public Type create(Type type) {
        return typeRepository.save(type);
    }

    public void delete(int id) {
        typeRepository.deleteById(id);
    }

    public Type select(Integer id) {
        return typeRepository.findById(id).get();
    }

    public String getTest(){
        return typeRepository.sel();
    }
}
