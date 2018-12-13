package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.VendorCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Интерфейс описывающий основные методы для работы с сущностью VendorCode
 */
public interface IVendorCodeRepository extends JpaRepository<VendorCode, Integer> {

    /**
     * Возвращает сущность vendorCode в зависимости от его типа
     * @param typeId - идентификатор типа
     * @return - Возвращает сущность vendorCode в зависимости от его типа
     */
    @Query("FROM VendorCode vc WHERE vc.type.id=:typeId")
    List<VendorCode> getVendorCodeListByType(@Param("typeId") int typeId);
}

