package kss.utility.todo.service;

import kss.utility.todo.dto.todo.todoRequest;
import kss.utility.todo.dto.todo.todoResponse;
import kss.utility.todo.entity.todo;
import kss.utility.todo.mapper.todoMapper;
import kss.utility.todo.repository.todoRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class todoService {

    private final todoRepo repo;
    private final todoMapper tMapper;

    public todoService(todoRepo repo,todoMapper tMapper){
        this.repo=repo;
        this.tMapper=tMapper;
    }

    public todoResponse addTodo(todoRequest todo){
        todo entity = tMapper.toEntity(todo);
        return tMapper.mapToResponse(repo.save(entity));
    }

    public List<todoResponse> getAll(){
        List<todo> todos = repo.findAll();
        return todos
                .stream()
                .map(tMapper::mapToResponse)
                .toList();
    }



}
