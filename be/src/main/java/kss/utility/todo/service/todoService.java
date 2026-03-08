package kss.utility.todo.service;

import kss.utility.todo.entity.todoEntity;
import kss.utility.todo.repository.todoRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class todoService {

    private final todoRepo repo;

    public todoService(todoRepo repo){
        this.repo=repo;
    }

    public todoEntity addTodo(todoEntity todo){
        return repo.save(todo);
    }

    public List<todoEntity> getAll(){
        return repo.findAll();
    }

}
