package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.AgeGender;
import by.intexsoft.artiushenko.repository.IAgeGenderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущностью AgeGender
 */
@Service
public class AgeGenderService {
    @Autowired
    IAgeGenderRepository IAgeGenderRepository;

    /**
     * Возвращает список сущностей ageGender
     */
    public List<AgeGender> findAll(){
        List<AgeGender> list = IAgeGenderRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_age_gender)
     */
    public AgeGender create(AgeGender ageGender) {
        return IAgeGenderRepository.save(ageGender);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_age_gender)
     */
    public void delete(int id) {
        IAgeGenderRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_age_gender) по id
     */
    public AgeGender select(Integer id) {
        return IAgeGenderRepository.findById(id).get();
    }

}
