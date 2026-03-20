package kss.utility.todo.service;

import kss.utility.todo.dto.category.categoryRequest;
import kss.utility.todo.dto.category.categoryResponse;
import kss.utility.todo.mapper.categoryMapper;
import kss.utility.todo.repository.categoryRepo;
import org.springframework.stereotype.Service;

@Service
public class categoryService {
    public final categoryRepo cRepo;
    public final categoryMapper cMapper;

    public categoryService(categoryRepo cRepo, categoryMapper cMapper){
        this.cRepo=cRepo;
        this.cMapper=cMapper;
    }

    public categoryResponse addCategory(categoryRequest cat){
        return cMapper.mapToResponse(
                  cRepo.save(
                     cMapper.toEntity(cat)));
    }
}
