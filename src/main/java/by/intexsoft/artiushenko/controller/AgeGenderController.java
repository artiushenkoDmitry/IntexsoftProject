package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.AgeGender;
import by.intexsoft.artiushenko.service.AgeGenderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/ageGender")
public class AgeGenderController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    AgeGenderService ageGenderService;

    @GetMapping
    public List<AgeGender> getAll() {
        List<AgeGender> ageGenders = ageGenderService.findAll();
        return ageGenders;
    }

    @PostMapping
    public AgeGender create(@RequestBody AgeGender ageGender) {
        return ageGenderService.create(ageGender);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete role with id: {}", id);
        ageGenderService.delete(id);
    }

    @CrossOrigin
    @GetMapping("/select/{id}")
    public AgeGender selectOne(@PathVariable("id") int id) {
        AgeGender ageGender = ageGenderService.select(id);
        return ageGender;
    }
}
