package kss.utility.todo.controller;


import kss.utility.todo.dto.category.categoryRequest;
import kss.utility.todo.dto.category.categoryResponse;
import kss.utility.todo.service.categoryService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cat")
public class categoryController {
    private final categoryService service;

    public categoryController(categoryService service){
        this.service=service;
    }

    @PostMapping("/add")
    public categoryResponse addCategory(@RequestBody categoryRequest cat){
        return service.addCategory(cat);
    }
}
