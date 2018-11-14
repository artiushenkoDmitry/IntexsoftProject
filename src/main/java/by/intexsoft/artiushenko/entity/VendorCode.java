package by.intexsoft.artiushenko.entity;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

@Entity
@Table(name = "t_vendor_code")
public class VendorCode extends AbstractPersistable<Integer>{
    @Column(name="quantity_available")
    private int quantityAvailable;

    @Column(name="prise")
    private int prise;

    @ManyToOne(cascade = CascadeType.REMOVE /*fetch = FetchType.EAGER*/)
    @JoinColumn(name="fk_vendor_code_brand")
    private Brand brand;

    @ManyToOne(cascade = CascadeType.REMOVE/*, fetch = FetchType.EAGER*/)
    @JoinColumn(name="fk_vendor_code_type")
    private Type type;

    @ManyToOne(cascade = CascadeType.REMOVE/*, fetch = FetchType.LAZY*/)
    @JoinColumn(name="fk_vendor_code_age_gender")
    private AgeGender ageGender;

    @ManyToOne(cascade = CascadeType.REMOVE/*, fetch = FetchType.LAZY*/)
    @JoinColumn(name="fk_vendor_code_user")
    private User user;

//    @ManyToOne(cascade = CascadeType.REMOVE /*fetch = FetchType.EAGER*/)
//    @JoinColumn(name="fk_vendor_code_order")
//    private Order order;

    public int getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(int quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    public int getPrise() {
        return prise;
    }

    public void setPrise(int prise) {
        this.prise = prise;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public AgeGender getAgeGender() {
        return ageGender;
    }

    public void setAgeGender(AgeGender ageGender) {
        this.ageGender = ageGender;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "VendorCode{" +
                "quantityAvailable=" + quantityAvailable +
                ", prise=" + prise +
                ", brand=" + brand +
                ", type=" + type +
                ", ageGender=" + ageGender +
                ", user=" + user +
                '}';
    }
}
