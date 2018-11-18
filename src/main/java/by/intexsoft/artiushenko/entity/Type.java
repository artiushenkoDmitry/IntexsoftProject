package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Сущьность описывающая тип товара
 */
@Entity
@Table(name = "t_type")
public class Type extends AbstractPersistable<Integer>{
    @Column(length = 120, name="type_name")
    private String typeName;

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

//    @Override
//    public String toString() {
//        return "Type{" +
//                "typeName='" + typeName + '\'' +
//                '}';
//    }
}
