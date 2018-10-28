package by.intexsoft.artiushenko.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

@Entity
@Table(name = "t_role")
public class Role extends AbstractPersistable<Integer> {
    @Column(length = 60, name="type")
    private String type;


//    @OneToMany(/*cascade = CascadeType.ALL, fetch = FetchType.LAZY,*/mappedBy="type")
//    private List<User> users;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
                "type='" + type + '\'' +
//                ", users=" + users +
                '}';
    }
}