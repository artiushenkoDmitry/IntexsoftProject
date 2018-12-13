package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.VendorCode;
import by.intexsoft.artiushenko.repository.IVendorCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сервис описывающий основые методы для работы с сущностью VendorCode
 */
@Service
public class VendorCodeService {
    @Autowired
    IVendorCodeRepository IVendorCodeRepository;

    /**
     * Возвращает список сущностей vendorCode
     */
    public List<VendorCode> findAll(){
        List<VendorCode> list = IVendorCodeRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_vendor_code)
     */
    public VendorCode create(VendorCode vendorCode) {
        return IVendorCodeRepository.save(vendorCode);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_vendor_code)
     */
    public void delete(int id) {
        IVendorCodeRepository.deleteById(id);
    }

    /**
     * Выбирает запись из базы данных (из таблицы t_vendor_code) по id
     */
    public VendorCode select(Integer id) {
        return IVendorCodeRepository.findById(id).get();
    }

    /**
     * Возвращает список артикулов соответствующий указанному типу
     * @param typeId - идентификатор типа артикулы которых хотим получить
     */
    public List<VendorCode> getVendorCodeListByType(int typeId){
        return IVendorCodeRepository.getVendorCodeListByType(typeId);
    }

    /**
     * Метод уменьшает в базе данных значение quantity_available таблицы t_vendor_code,
     * высылает соответствующее письмо по электронному адресу указанному при заказе.
     * Этот метод вызывается после того, как покупатель разместил заказ, а продавец подтвердил его.
     */
    public VendorCode approveOrder(VendorCode vendorCode){
        return IVendorCodeRepository.save(vendorCode);
    }
}
