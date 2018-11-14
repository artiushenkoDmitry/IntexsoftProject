package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.Good;
import by.intexsoft.artiushenko.entity.Order;
import by.intexsoft.artiushenko.entity.Type;
import by.intexsoft.artiushenko.entity.VendorCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VendorCodeRepository extends JpaRepository<VendorCode, Integer> {

    /**
     * 1-туфли
     * 2-джинсы
     * 3-рубашки
     * 4-спортивная одежда
     * @param typeId
     * @return
     */
    @Query("FROM VendorCode vc WHERE vc.type.id=:typeId")
    List<VendorCode> getVendorCodeListByType(@Param("typeId") int typeId);
}

