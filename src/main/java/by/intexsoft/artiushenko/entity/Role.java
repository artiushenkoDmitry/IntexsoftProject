package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Сущность описывающая роль пользователя
 */
@Entity
@Table(name = "t_role")
public class Role extends AbstractPersistable<Integer> {
    @Column(length = 60, name="type")
    private String type;

    /**
     * Возвращает поле type объекта role
     * @return - Возвращает поле type объекта role
     */
    public String getType() {
        return type;
    }

    /**
     * Присваивает значение соответствующему полю объекта role
     * @param type - присваиваемое значение
     */
    public void setType(String type) {
        this.type = type;
    }
}