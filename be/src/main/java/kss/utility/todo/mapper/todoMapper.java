package kss.utility.todo.mapper;

import kss.utility.todo.dto.todo.todoRequest;
import kss.utility.todo.dto.todo.todoResponse;
import kss.utility.todo.entity.category;
import kss.utility.todo.entity.todo;
import kss.utility.todo.repository.categoryRepo;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class todoMapper {

    private categoryRepo cRepo;

    private todoMapper(categoryRepo cRepo){
        this.cRepo = cRepo;
    }

    public todoResponse mapToResponse(todo todo){
        todoResponse  response = new todoResponse();
        response.setId(todo.getId());
        response.setName(todo.getName());
        response.setDescription(todo.getDescription());
        response.setStatus(todo.getStatus());

        if(todo.getCategories()!=null){
            String categoryNames = todo.getCategories()
                    .stream()
                    .map(category::getName)
                    .collect(Collectors.joining(" "));
            response.setCategories(categoryNames);
        }

        return response;
    }

    public todo toEntity(todoRequest todo){
        todo entity = new todo();
        entity.setId(todo.getId());
        entity.setName(todo.getName());
        entity.setDescription(todo.getDescription());
        entity.setStatus(todo.getStatus());

        if(todo.getCategories()!=null){
            List<String> categoryNames = Arrays.asList(todo.getCategories().split(" "));
            List<category> categories = cRepo.findByNameIn(categoryNames);
            entity.setCategories(categories);
        }

        return entity;
    }
}
