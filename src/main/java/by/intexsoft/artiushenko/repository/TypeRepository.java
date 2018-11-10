package by.intexsoft.artiushenko.repository;

import by.intexsoft.artiushenko.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TypeRepository extends JpaRepository<Type, Integer>{
    @Query("select typeName FROM Type type where type.id=2")
    String sel();
}
