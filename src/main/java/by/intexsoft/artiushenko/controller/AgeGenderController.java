package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.AgeGender;
import by.intexsoft.artiushenko.service.AgeGenderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Контроллер содержащий методы для работы с сущьностью AgeGender
 */
@CrossOrigin
@RestController
@RequestMapping("/ageGender")
public class AgeGenderController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    AgeGenderService ageGenderService;

    /**
     * Возвращает список сущьностей ageGender
     */
    @GetMapping
    public List<AgeGender> getAll() {
        List<AgeGender> ageGenders = ageGenderService.findAll();
        return ageGenders;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_age_gender)
     */
    @PostMapping
    public AgeGender create(@RequestBody AgeGender ageGender) {
        return ageGenderService.create(ageGender);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_age_gender)
     */
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        ageGenderService.delete(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_age_gender) по id
     */
    @CrossOrigin
    @GetMapping("/select/{id}")
    public AgeGender selectOne(@PathVariable("id") int id) {
        return  ageGenderService.select(id);
    }
}
