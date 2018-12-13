package by.intexsoft.artiushenko.entity;
import org.springframework.data.jpa.domain.AbstractPersistable;
import javax.persistence.*;
import java.util.Set;

/**
 * Сущность описывающая возраст и пол которому соответствует товар
 */
@Entity
@Table(name = "t_age_gender")
public class AgeGender extends AbstractPersistable<Integer>{
    @Column(length = 120, name="age_gender")
    private String ageGender;

    /**
     * Возвращает поле ageGender объекта ageGender
     * @return - Возвращает поле ageGender объекта ageGender
     */
    public String getAgeGender() {
        return ageGender;
    }

    /**
     * Присваивает значение соответствующему полю объекта ageGender
     * @param ageGender - присваиваемое значение
     */
    public void setAgeGender(String ageGender) {
        this.ageGender = ageGender;
    }
}
