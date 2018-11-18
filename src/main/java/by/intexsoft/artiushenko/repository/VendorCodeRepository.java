package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.VendorCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Интерфейс описывающий основные методы для работы с сущьностью VendorCode
 */
public interface VendorCodeRepository extends JpaRepository<VendorCode, Integer> {

    @Query("FROM VendorCode vc WHERE vc.type.id=:typeId")
    List<VendorCode> getVendorCodeListByType(@Param("typeId") int typeId);
}

