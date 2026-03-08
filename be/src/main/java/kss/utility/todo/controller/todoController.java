package kss.utility.todo.controller;


import kss.utility.todo.entity.todoEntity;
import kss.utility.todo.service.todoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class todoController {

    private final todoService service;

    public todoController(todoService service){
        this.service=service;
    }

    @PostMapping("/add")
    public todoEntity addTodo(@RequestBody todoEntity todo){
        return service.addTodo(todo);
    }

    @GetMapping("/get")
    public List<todoEntity> addTodo(){
        return service.getAll();
    }
}
