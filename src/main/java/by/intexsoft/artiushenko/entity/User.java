package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import java.util.List;

/**
 * Сущность описывающая пользователя
 */
@Entity
@Table(name = "t_user")
public class User extends AbstractPersistable<Integer> {
    @Column(length = 120, name="full_name")
    private String fullName;

    @Column(length = 60,name = "username")
    private String username;

    @Column(length = 60,name = "password")
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="fk_user_role")
    private Role role;

    /**
     * Возвращает поле fullName объекта user
     * @return - Возвращает поле fullName объекта user
     */
    public String getFullName() {
        return fullName;
    }

    /**
     * Присваивает значение соответствующему полю объекта user
     * @param fullName - присваиваемое значение
     */
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    /**
     * Возвращает поле username объекта user
     * @return - Возвращает поле username объекта user
     */
    public String getUsername() {
        return username;
    }

    /**
     * Присваивает значение соответствующему полю объекта user
     * @param username - присваиваемое значение
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Возвращает поле password объекта user
     * @return - Возвращает поле password объекта user
     */
    public String getPassword() {
        return password;
    }

    /**
     * Присваивает значение соответствующему полю объекта user
     * @param password - присваиваемое значение
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Возвращает поле role объекта user
     * @return - Возвращает поле role объекта user
     */
    public Role getRole() {
        return role;
    }

    /**
     * Присваивает значение соответствующему полю объекта user
     * @param role - присваиваемое значение
     */
    public void setRole(Role role) {
        this.role = role;
    }
}

