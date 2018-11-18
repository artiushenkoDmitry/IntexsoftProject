package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.controller.VendorCodeController;
import by.intexsoft.artiushenko.entity.VendorCode;
import by.intexsoft.artiushenko.repository.VendorCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

/**
 * Сервис описывающий основые методы для работы с сущьностью VendorCode
 */
@Service
public class VendorCodeService {
    @Autowired
    VendorCodeRepository vendorCodeRepository;

    /**
     * Возвращает список сущьностей vendorCode
     */
    public List<VendorCode> findAll(){
        List<VendorCode> list = vendorCodeRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_vendor_code)
     */
    public VendorCode create(VendorCode vendorCode) {
        return vendorCodeRepository.save(vendorCode);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_vendor_code)
     */
    public void delete(int id) {
        vendorCodeRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_vendor_code) по id
     */
    public VendorCode select(Integer id) {
        return vendorCodeRepository.findById(id).get();
    }

    /**
     * Возвращает список артикулов соответствующий указанному типу
     * @param typeId - идентификатор типа артикулы которых хотим получить
     */
    public List<VendorCode> getVendorCodeListByType(int typeId){
        return vendorCodeRepository.getVendorCodeListByType(typeId);
    }

    /**
     * Метод уменьшает в базе данных значение quantity_available таблицы t_vendor_code,
     * высылает соответствующее письмо по электронному адресу указанному при заказе.
     * Этот метод вызывается после того, как покупатель разместил заказ, а продавец подтвердил его.
     */
    public VendorCode approveOrder(VendorCode vendorCode){
        return vendorCodeRepository.save(vendorCode);
    }
}
