package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Сущьность описывающая бренд товара
 */
@Entity
@Table(name = "t_brand")
public class Brand extends AbstractPersistable<Integer> {
    @Column(length = 120, name="brand_name")
    private String brandName;

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

//    @Override
//    public String toString() {
//        return "Brand{" +
//                "brandName='" + brandName + '\'' +
//                '}';
//    }
}