package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "t_role")
public class Role extends AbstractPersistable<Integer> {
    @Column(length = 60, name="role")
    private String role;


//    @OneToMany(/*cascade = CascadeType.ALL, fetch = FetchType.LAZY,*/mappedBy="role")
//    private List<User> users;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

//    public List<User> getUsers() {
//        return users;
//    }
//
//    public void setUsers(List<User> users) {
//        this.users = users;
//    }

    @Override
    public String toString() {
        return "Role{" +
                "role='" + role + '\'' +
//                ", users=" + users +
                '}';
    }
}