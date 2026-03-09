package kss.utility.todo.service;

import kss.utility.todo.entity.todo;
import kss.utility.todo.repository.todoRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class todoService {

    private final todoRepo repo;

    public todoService(todoRepo repo){
        this.repo=repo;
    }

    public todo addTodo(todo todo){
        return repo.save(todo);
    }

    public List<todo> getAll(){
        return repo.findAll();
    }

}
