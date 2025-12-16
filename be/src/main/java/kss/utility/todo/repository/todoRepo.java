package kss.utility.todo.repository;

import jakarta.transaction.Transactional;
import kss.utility.todo.entity.category;
import kss.utility.todo.entity.todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface todoRepo extends JpaRepository<todo,Long> {

        @Modifying
        @Query(value = "Update todo t set t.pos=t.pos+1 where t.pos>= :cIdx AND t.pos <= :pIdx order by t.pos desc",nativeQuery = true)
        void shiftUp(@Param("cIdx") int cIdx,@Param("pIdx") int pIdx);


        @Modifying
        @Query(value = "Update todo t set t.pos=t.pos-1 where t.pos<= :cIdx AND t.pos >= :pIdx order by t.pos asc",nativeQuery = true)
        void shiftDown(@Param("cIdx") int cIdx,@Param("pIdx") int pIdx);

        @Modifying
        @Query("Update todo t set t.pos=:cIdx where t.pos=:pIdx")
        void shiftTodo(@Param("cIdx") int cIdx,@Param("pIdx") int pIdx);

        @Query("Select Max(pos) from todo")
        Integer findMaxPos();

        @Transactional
        @Query("Select t from todo t left join fetch t.categories order by t.pos asc")
        List<todo> findAllWithCategories();
}
