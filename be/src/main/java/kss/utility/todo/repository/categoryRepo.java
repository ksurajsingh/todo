package kss.utility.todo.repository;

import kss.utility.todo.entity.category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface categoryRepo extends JpaRepository<category,Long> {
    List<category> findByNameIn(List<String> categoryNames);
}
