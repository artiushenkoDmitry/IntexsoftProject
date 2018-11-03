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

    @ManyToOne(cascade = CascadeType.REMOVE /*fetch = FetchType.EAGER*/)
    @JoinColumn(name="fk_vendor_code_type")
    private Type type;

    @ManyToOne(cascade = CascadeType.REMOVE /*fetch = FetchType.EAGER*/)
    @JoinColumn(name="fk_vendor_code_age_gender")
    private AgeGender ageGender;

    @ManyToOne(cascade = CascadeType.REMOVE /*fetch = FetchType.EAGER*/)
    @JoinColumn(name="fk_vendor_code_order")
    private Order order;
}
