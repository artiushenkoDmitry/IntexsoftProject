package by.intexsoft.artiushenko.entity;
import org.springframework.data.jpa.domain.AbstractPersistable;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "t_age_gender")
public class AgeGender extends AbstractPersistable<Integer>{
    @Column(length = 120, name="age_gender")
    private String ageGender;

//    @OneToMany(mappedBy = "ageGender"/*, fetch = FetchType.LAZY*/)
//    private Set<VendorCode> vendorCodes;

    public String getAgeGender() {
        return ageGender;
    }

    public void setAgeGender(String ageGender) {
        this.ageGender = ageGender;
    }

//    public Set<VendorCode> getVendorCodes() {
//        return vendorCodes;
//    }

//    public void setVendorCodes(Set<VendorCode> vendorCodes) {
//        this.vendorCodes = vendorCodes;
//    }


    @Override
    public String toString() {
        return "AgeGender{" +
                "ageGender='" + ageGender + '\'' +
                '}';
    }
}
