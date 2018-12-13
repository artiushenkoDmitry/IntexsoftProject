package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Сущность описывающая тип товара
 */
@Entity
@Table(name = "t_type")
public class Type extends AbstractPersistable<Integer>{
    @Column(length = 120, name="type_name")
    private String typeName;

    /**
     * Возвращает поле typeName объекта type
     * @return - Возвращает поле type объекта role
     */
    public String getTypeName() {
        return typeName;
    }

    /**
     * Присваивает значение соответствующему полю объекта type
     * @param typeName - присваиваемое значение
     */
    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}
