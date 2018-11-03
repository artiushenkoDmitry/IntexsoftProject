package by.intexsoft.artiushenko.entity;
import org.springframework.data.jpa.domain.AbstractPersistable;
import javax.persistence.*;

@Entity
@Table(name = "t_age_gender")
public class AgeGender extends AbstractPersistable<Integer>{
    @Column(length = 120, name="age_gender")
    private String ageGender;

    public String getAgeGender() {
        return ageGender;
    }

    public void setAgeGender(String ageGender) {
        this.ageGender = ageGender;
    }

    @Override
    public String toString() {
        return "AgeGender{" +
                "ageGender='" + ageGender + '\'' +
                '}';
    }
}
