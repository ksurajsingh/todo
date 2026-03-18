package kss.utility.todo.dto.todo;

import kss.utility.todo.entity.category;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class todoResponse {
    private long id;
    private String name;
    private String description;
    private String status;
    private String categories;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
}
