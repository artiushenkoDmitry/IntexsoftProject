package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

@Entity
@Table(name = "t_order")
public class Order extends AbstractPersistable<Integer> {
    @Column(name="quantity_ordered")
    private int quantityOrdered;

    @Column(name="is_approved")
    private boolean isApproved;

    @ManyToOne(cascade = CascadeType.REMOVE /* fetch = FetchType.EAGER*/)
    @JoinColumn(name="fk_order_bascket")
    private Basket basket;

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

    public Basket getBasket() {
        return basket;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
    }

    @Override
    public String toString() {
        return "Order{" +
                "quantityOrdered=" + quantityOrdered +
                ", isApproved=" + isApproved +
                ", basket=" + basket +
                '}';
    }
}