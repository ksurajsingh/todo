package kss.utility.todo.repository;

import kss.utility.todo.entity.todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface todoRepo extends JpaRepository<todo,Long> {
}
