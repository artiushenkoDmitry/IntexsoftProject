package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Сущность описывающая заказ
 */
@Entity
@Table(name = "t_order")
public class Order extends AbstractPersistable<Integer> {
    @Column(name="quantity_ordered")
    private int quantityOrdered;

    @Column(length = 120, name="customer_name")
    private String customerName;

    @Column(length = 60, name="customer_email")
    private String customerEMail;

    @Column(length = 120, name="customer_address")
    private String customerAddress;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="fk_order_vendor_code")
    private VendorCode vendorCode;

    /**
     * Возвращает поле quantityOrdered объекта order
     * @return - Возвращает поле quantityOrdered объекта order
     */
    public int getQuantityOrdered() {
        return quantityOrdered;
    }

    public void setQuantityOrdered(int quantityOrdered) {
        this.quantityOrdered = quantityOrdered;
    }

    /**
     * Возвращает поле customerName объекта order
     * @return - Возвращает поле customerName объекта order
     */
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    /**
     * Возвращает поле customerEMail объекта order
     * @return - Возвращает поле customerEMail объекта order
     */
    public String getCustomerEMail() {
        return customerEMail;
    }

    /**
     * Присваивает значение соответствующему полю объекта order
     * @param customerEMail - присваиваемое значение
     */
    public void setCustomerEMail(String customerEMail) {
        this.customerEMail = customerEMail;
    }

    /**
     * Возвращает поле customerAddress объекта order
     * @return - Возвращает поле customerAddress объекта order
     */
    public String getCustomerAddress() {
        return customerAddress;
    }

    /**
     * Присваивает значение соответствующему полю объекта order
     * @param customerAddress - присваиваемое значение
     */
    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    /**
     * Возвращает поле vendorCode объекта order
     * @return - Возвращает поле vendorCode объекта order
     */
    public VendorCode getVendorCode() {
        return vendorCode;
    }

    /**
     * Присваивает значение соответствующему полю объекта order
     * @param vendorCode - присваиваемое значение
     */
    public void setVendorCode(VendorCode vendorCode) {
        this.vendorCode = vendorCode;
    }

}