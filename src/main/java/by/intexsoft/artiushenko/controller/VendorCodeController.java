package by.intexsoft.artiushenko.controller;

import by.intexsoft.artiushenko.entity.VendorCode;
import by.intexsoft.artiushenko.service.VendorCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

/**
 * Контроллер содержащий методы для работы с сущностью VendorCode
 */
@CrossOrigin
@RestController
@RequestMapping("/vendorCode")
public class VendorCodeController {
    private static Logger log = LoggerFactory.getLogger(RoleController.class);
    @Autowired
    VendorCodeService vendorCodeService;

    /**
     * Возвращает список артикулов соответствующий указанному типу
     * @param id - идентификатор типа артикулы которых хотим получить
     */
    @GetMapping("/getVcodesByType/{id}")
    public List<VendorCode> getVendorCodeListByType(@PathVariable("id") int id) {
        return vendorCodeService.getVendorCodeListByType(id);
    }

    /**
     * Метод уменьшает в базе данных значение quantity_available таблицы t_vendor_code.
     * Этот метод вызывается после того, как покупатель разместил заказ, а продавец подтвердил его.
     */
    @PostMapping("/approveOrder")
    public VendorCode approveOrder(@RequestBody VendorCode vendorCode) throws IOException, MessagingException {
        return vendorCodeService.approveOrder(vendorCode);
    }

    /**
     * Возвращает список сущностей vendorCode
     */
    @GetMapping
    public List<VendorCode> getAll() {
        List<VendorCode> vendorCodes = vendorCodeService.findAll();
        return vendorCodes;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_vendor_code)
     */
    @PostMapping
    public VendorCode create(@RequestBody VendorCode vendorCode) {
        return vendorCodeService.create(vendorCode);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_vendor_code)
     */
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        log.info("Delete role with id: {}", id);
        vendorCodeService.delete(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_vendor_code) по id
     */
    @CrossOrigin
    @GetMapping("/select/{id}")
    public VendorCode selectOne(@PathVariable("id") int id) {
        VendorCode vendorCode = vendorCodeService.select(id);
        return vendorCode;
    }
}
