package kss.utility.todo.dto.todo;


import lombok.Data;

@Data
public class reorderRequest {
   private int prev_index;
   private int cur_index;
}
