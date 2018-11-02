package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "t_goods")
public class Good extends AbstractPersistable<Integer> {
    @Column(length = 20, name="type")
    private String type;

    @Column(name="discount")
    int discount;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    @Override
    public String toString() {
        return "Good{" +
                "type='" + type + '\'' +
                ", discount=" + discount +
                '}';
    }
}
