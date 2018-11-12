package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.Basket;
import by.intexsoft.artiushenko.entity.Order;
import by.intexsoft.artiushenko.entity.VendorCode;
import by.intexsoft.artiushenko.service.BasketService;
import by.intexsoft.artiushenko.service.VendorCodeService;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/vendorCode")
public class VendorCodeController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    VendorCodeService vendorCodeService;

    @GetMapping("/shoes")
    public List<VendorCode> getShoesList() {
        return vendorCodeService.getShoesList();
    }

    @GetMapping("/jeans")
    public List<VendorCode> getJeansList() {
        return vendorCodeService.getJeansList();
    }

    @GetMapping("/sportswear")
    public List<VendorCode> getSportswearList() {
        return vendorCodeService.getSportswearList();
    }

    @GetMapping("/shirt")
    public List<VendorCode> getShirtList() {
        return vendorCodeService.getShirtList();
    }

    @GetMapping("/getVcodesByType/{id}")
    public List<VendorCode> getVendorCodeListByType(@PathVariable("id") int id) {
        return vendorCodeService.getVendorCodeListByType(id);
    }

//    @PostMapping("/jeans/addOrder")
//    public Order addOrder(@RequestBody Order order) {
//        return vendorCodeService.addOrder();
//    }

    @GetMapping
    public List<VendorCode> getAll() {
        List<VendorCode> vendorCodes = vendorCodeService.findAll();
        return vendorCodes;
    }

    @PostMapping
    public VendorCode create(@RequestBody VendorCode vendorCode) {
        return vendorCodeService.create(vendorCode);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete role with id: {}", id);
        vendorCodeService.delete(id);
    }

    @CrossOrigin
    @GetMapping("/select/{id}")
    public VendorCode selectOne(@PathVariable("id") int id) {
        VendorCode vendorCode = vendorCodeService.select(id);
        return vendorCode;
    }
}
