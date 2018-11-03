package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.AgeGender;
import by.intexsoft.artiushenko.repository.AgeGenderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgeGenderService {
    @Autowired
    AgeGenderRepository ageGenderRepository;

    public List<AgeGender> findAll(){
        List<AgeGender> list = ageGenderRepository.findAll();
        return list;
    }

    public AgeGender create(AgeGender ageGender) {
        return ageGenderRepository.save(ageGender);
    }

    public void delete(int id) {
        ageGenderRepository.deleteById(id);
    }

    public AgeGender select(Integer id) {
        return ageGenderRepository.findById(id).get();
    }

}
