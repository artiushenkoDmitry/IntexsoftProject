package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.Order;
import by.intexsoft.artiushenko.entity.Type;
import by.intexsoft.artiushenko.entity.VendorCode;
import by.intexsoft.artiushenko.repository.TypeRepository;
import by.intexsoft.artiushenko.repository.VendorCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorCodeService {
    @Autowired
    VendorCodeRepository vendorCodeRepository;

    public List<VendorCode> findAll(){
        List<VendorCode> list = vendorCodeRepository.findAll();
        return list;
    }

    public VendorCode create(VendorCode vendorCode) {
        return vendorCodeRepository.save(vendorCode);
    }

    public void delete(int id) {
        vendorCodeRepository.deleteById(id);
    }

    public VendorCode select(Integer id) {
        return vendorCodeRepository.findById(id).get();
    }

    public List<VendorCode> getVendorCodeListByType(int typeId){
        return vendorCodeRepository.getVendorCodeListByType(typeId);
    }

    public VendorCode approveOrder(VendorCode vendorCode){
        return vendorCodeRepository.save(vendorCode);
    }
//    public Order addOrder(){
//        return vendorCodeRepository.addOrder();
//    }
}
