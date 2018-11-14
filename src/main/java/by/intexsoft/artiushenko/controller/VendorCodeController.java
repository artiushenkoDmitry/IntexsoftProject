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

    @GetMapping("/getVcodesByType/{id}")
    public List<VendorCode> getVendorCodeListByType(@PathVariable("id") int id) {
        return vendorCodeService.getVendorCodeListByType(id);
    }

    @PostMapping("/approveOrder")
    public VendorCode approveOrder(@RequestBody VendorCode vendorCode){
        return vendorCodeService.approveOrder(vendorCode);
    }

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
