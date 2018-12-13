package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Сущность описывающая бренд товара
 */
@Entity
@Table(name = "t_brand")
public class Brand extends AbstractPersistable<Integer> {
    @Column(length = 120, name="brand_name")
    private String brandName;

    /**
     * Возвращает поле brandName объекта brand
     * @return - ВВозвращает поле brandName объекта brand
     */
    public String getBrandName() {
        return brandName;
    }

    /**
     * Присваивает значение соответствующему полю объекта brand
     * @param brandName - присваиваемое значение
     */
    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }
}