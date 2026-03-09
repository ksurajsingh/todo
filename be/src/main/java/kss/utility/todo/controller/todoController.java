package kss.utility.todo.controller;


import kss.utility.todo.entity.todo;
import kss.utility.todo.repository.todoRepo;
import kss.utility.todo.service.todoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class todoController {

    private final todoService service;

    public todoController(todoService service, todoRepo tRepo) {
        this.service = service;
    }

    @PostMapping("/add")
    public todo addTodo(@RequestBody todo todo) {
        return service.addTodo(todo);
    }

    @GetMapping("/get")
    public List<todo> addTodo() {
        return service.getAll();
    }

    @GetMapping("/all")
    public List<todo> getAllTodos() {
        return service.getAll();
    }
}
