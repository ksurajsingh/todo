package kss.utility.todo.repository;

import kss.utility.todo.entity.todoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface todoRepo extends JpaRepository<todoEntity,Long> {
}
