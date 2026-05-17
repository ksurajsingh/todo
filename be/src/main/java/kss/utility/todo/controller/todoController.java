package kss.utility.todo.controller;


import kss.utility.todo.dto.todo.reorderRequest;
import kss.utility.todo.dto.todo.todoRequest;
import kss.utility.todo.dto.todo.todoResponse;
import kss.utility.todo.repository.todoRepo;
import kss.utility.todo.service.todoService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class todoController {

    private final todoService service;

    public todoController(todoService service, todoRepo tRepo) {
        this.service = service;
    }

    @PostMapping("/add")
    public todoResponse addTodo(@RequestBody todoRequest todo) {
        return service.addTodo(todo);
    }

    @GetMapping("/all")
    public List<todoResponse> getAllTodos() {
        return service.getAll();
    }

    @PatchMapping("/reorder")
    public String reorderTodos(@RequestBody reorderRequest req){
        return service.reorderTodos(req.getPrev_index(),req.getCur_index());
    }
}
