package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "t_user")
public class User extends AbstractPersistable<Integer> {
    @Column(length = 120, name="full_name")
    private String full_name;

    @Column(length = 60,name = "name")
    private String name;

    @Column(length = 60,name = "password")
    private String password;

//    @Column(name = "fk_user_role")
//    private int fk_user_role;
    @ManyToOne(/*cascade = CascadeType.ALL fetch = FetchType.LAZY*/)
    @JoinColumn(name="fk_user_role")
    private Role role;

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return "User{" +
                "full_name='" + full_name + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                '}';
    }
}

