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
    @Query("FROM VendorCode vc WHERE vc.type=4")
    List<VendorCode> getSportswearList();

    @Query("FROM VendorCode vc WHERE vc.type=3")
    List<VendorCode> getShirtList();

    @Query("FROM VendorCode vc WHERE vc.type=2")
    List<VendorCode> getJeansList();

//    @Query("FROM VendorCode vc WHERE vc.type=:typeId")
//    List<VendorCode> getJeansList(int typeId);

    @Query("FROM VendorCode vc WHERE vc.type=1")
    List<VendorCode> getShoesList();

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

/**
 * select * from Book book where book.author=:author
 */