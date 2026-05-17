package kss.utility.todo.repository;

import kss.utility.todo.entity.category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface categoryRepo extends JpaRepository<category,Long> {
    List<category> findByNameIn(List<String> categoryNames);

    Optional<category> findByName(String name);
}
