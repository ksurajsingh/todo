package kss.utility.todo.dto.todo;

import lombok.Data;

@Data
public class todoRequest{
    private long id;
    private String name;
    private String description;
    private String status;
    private String categories;
    private int pos;
}
