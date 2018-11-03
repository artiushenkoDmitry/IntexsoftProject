package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Brand;
import by.intexsoft.artiushenko.service.BrandService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/brand")
public class BrandController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    BrandService brandService;

    @GetMapping
    public List<Brand> getAll() {
        List<Brand> brands = brandService.findAll();
        return brands;
    }

    @PostMapping
    public Brand create(@RequestBody Brand brand) {
        return brandService.create(brand);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete role with id: {}", id);
        brandService.delete(id);
    }

    @CrossOrigin
    @GetMapping("/select/{id}")
    public Brand selectOne(@PathVariable("id") int id) {
        Brand brand = brandService.select(id);
        return brand;
    }
}
