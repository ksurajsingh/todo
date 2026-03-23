package kss.utility.todo.mapper;

import kss.utility.todo.dto.category.categoryRequest;
import kss.utility.todo.dto.category.categoryResponse;
import kss.utility.todo.entity.category;
import kss.utility.todo.repository.categoryRepo;
import org.springframework.stereotype.Component;

@Component
public class categoryMapper {
    private categoryRepo cRepo;

    private categoryMapper(categoryRepo cRepo){
        this.cRepo = cRepo;
    }

    public categoryResponse mapToResponse(category cat){
        categoryResponse response = new categoryResponse();
        response.setId(cat.getId());
        response.setName(cat.getName());

        return response;
    }

    public category toEntity(categoryRequest cat){
        category entity= new category();
        entity.setId(cat.getId());
        entity.setName(cat.getName());

        return entity;
    }
}
