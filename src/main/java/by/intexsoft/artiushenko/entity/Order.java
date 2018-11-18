package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Сущьность описывающая заказ
 */
@Entity
@Table(name = "t_order")
public class Order extends AbstractPersistable<Integer> {
    @Column(name="quantity_ordered")
    private int quantityOrdered;

    @Column(name="is_approved")
    private boolean isApproved;

    @Column(length = 120, name="customer_name")
    private String customerName;

    @Column(length = 20, name="customer_email")
    private String customerEMail;

    @Column(length = 20, name="customer_address")
    private String customerAddress;

    @ManyToOne(/*cascade = CascadeType.REMOVE*/ fetch = FetchType.EAGER)
    @JoinColumn(name="fk_order_vendor_code")
    private VendorCode vendorCode;

    public int getQuantityOrdered() {
        return quantityOrdered;
    }

    public void setQuantityOrdered(int quantityOrdered) {
        this.quantityOrdered = quantityOrdered;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEMail() {
        return customerEMail;
    }

    public void setCustomerEMail(String customerEMail) {
        this.customerEMail = customerEMail;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public VendorCode getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(VendorCode vendorCode) {
        this.vendorCode = vendorCode;
    }

//    @Override
//    public String toString() {
//        return "Order{" +
//                "quantityOrdered=" + quantityOrdered +
//                ", isApproved=" + isApproved +
//                ", customerName='" + customerName + '\'' +
//                ", customerEMail='" + customerEMail + '\'' +
//                ", customerAddress='" + customerAddress + '\'' +
//                ", vendorCode=" + vendorCode +
//                '}';
//    }
}