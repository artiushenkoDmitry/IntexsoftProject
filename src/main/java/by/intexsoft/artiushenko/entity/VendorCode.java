package by.intexsoft.artiushenko.entity;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Сущность описывающая артикул
 */
@Entity
@Table(name = "t_vendor_code")
public class VendorCode extends AbstractPersistable<Integer>{
    @Column(name="quantity_available")
    private int quantityAvailable;

    @Column(name="prise")
    private int prise;

    @Column(name="size")
    private String size;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name="fk_vendor_code_brand")
    private Brand brand;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name="fk_vendor_code_type")
    private Type type;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name="fk_vendor_code_age_gender")
    private AgeGender ageGender;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name="fk_vendor_code_user")
    private User user;

    /**
     * Возвращает поле quantityAvailable объекта vendorCode
     * @return - Возвращает поле quantityAvailable объекта vendorCode
     */
    public int getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(int quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    /**
     * Возвращает поле prise объекта vendorCode
     * @return - Возвращает поле prise объекта vendorCode
     */
    public int getPrise() {
        return prise;
    }

    public void setPrise(int prise) {
        this.prise = prise;
    }

    /**
     * Возвращает поле brand объекта vendorCode
     * @return - Возвращает поле brand объекта vendorCode
     */
    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    /**
     * Возвращает поле type объекта vendorCode
     * @return - Возвращает поле type объекта vendorCode
     */
    public Type getType() {
        return type;
    }

    /**
     * Присваивает значение соответствующему полю объекта vendorCode
     * @param type - присваиваемое значение
     */
    public void setType(Type type) {
        this.type = type;
    }

    /**
     * Возвращает поле ageGender объекта vendorCode
     * @return - Возвращает поле ageGender объекта vendorCode
     */
    public AgeGender getAgeGender() {
        return ageGender;
    }

    /**
     * Присваивает значение соответствующему полю объекта vendorCode
     * @param ageGender - присваиваемое значение
     */
    public void setAgeGender(AgeGender ageGender) {
        this.ageGender = ageGender;
    }

    /**
     * Возвращает поле user объекта vendorCode
     * @return - Возвращает поле user объекта vendorCode
     */
    public User getUser() {
        return user;
    }

    /**
     * Присваивает значение соответствующему полю объекта vendorCode
     * @param user - присваиваемое значение
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * Возвращает поле size объекта vendorCode
     * @return - Возвращает поле size объекта vendorCode
     */
    public String getSize() {return size;}

    /**
     * Присваивает значение соответствующему полю объекта vendorCode
     * @param size - присваиваемое значение
     */
    public void setSize(String size) {this.size = size;}
}
