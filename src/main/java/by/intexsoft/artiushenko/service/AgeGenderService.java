package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.AgeGender;
import by.intexsoft.artiushenko.repository.AgeGenderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущьностью AgeGender
 */
@Service
public class AgeGenderService {
    @Autowired
    AgeGenderRepository ageGenderRepository;

    /**
     * Возвращает список сущьностей ageGender
     */
    public List<AgeGender> findAll(){
        List<AgeGender> list = ageGenderRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_age_gender)
     */
    public AgeGender create(AgeGender ageGender) {
        return ageGenderRepository.save(ageGender);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_age_gender)
     */
    public void delete(int id) {
        ageGenderRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_age_gender) по id
     */
    public AgeGender select(Integer id) {
        return ageGenderRepository.findById(id).get();
    }

}
