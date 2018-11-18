package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import java.util.List;

/**
 * Сущьность описывающая пользователя
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

//    @Column(username = "fk_user_role")
//    private int fk_user_role;
    @ManyToOne(/*cascade = CascadeType.ALL*/ fetch = FetchType.EAGER)
    @JoinColumn(name="fk_user_role")
    private Role role;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

//    @Override
//    public String toString() {
//        return "User{" +
//                "full_name='" + fullName + '\'' +
//                ", username='" + username + '\'' +
//                ", password='" + password + '\'' +
//                ", role=" + role +
//                '}';
//    }
}

