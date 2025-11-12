package kss.utility.todo.service;

import org.springframework.transaction.annotation.Transactional;  // ✅ correct
import kss.utility.todo.dto.todo.todoRequest;
import kss.utility.todo.dto.todo.todoResponse;
import kss.utility.todo.entity.todo;
import kss.utility.todo.mapper.todoMapper;
import kss.utility.todo.repository.todoRepo;
import kss.utility.todo.exception.CouldNotHappenException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class todoService {

    private final todoRepo repo;
    private final todoMapper tMapper;

    public todoService(todoRepo repo,todoMapper tMapper){
        this.repo=repo;
        this.tMapper=tMapper;
    }

    public todoResponse addTodo(todoRequest todo){
        Integer max=repo.findMaxPos();
        log.info("value of max pos obtained: {}",max);
        int nextPos=max==null?0:max+1;
        todo.setPos(nextPos);
        todo entity = tMapper.toEntity(todo);
        return tMapper.mapToResponse(repo.save(entity));
    }

    @Transactional
    public List<todoResponse> getAll(){
        List<todo> todos = repo.findAllWithCategories();
        return todos
                .stream()
                .map(tMapper::mapToResponse)
                .toList();
    }

    @Transactional
    public String reorderTodos(int pIdx,int cIdx){

        if(pIdx==cIdx){
            throw new CouldNotHappenException(
                    String.format(
                            "previousIndex:%d is equal to currentIndex:%d,while moving todo"
                            ,pIdx,cIdx
                    )
                    );
        }

        log.debug("shifting todo that has a previoud index of {} to -1",pIdx);

        // avoid duplicates
        repo.shiftTodo(-1,pIdx);

        log.debug("shifting done");

        // if the todo is moved up
        if(pIdx > cIdx){
            //add 1 to pos of all elements
            //that has a pos > cidx && pos < pIdx
            repo.shiftUp(cIdx,pIdx);
        }
        // if the todo is moved down
        else{
            //subtract 1 from pos of all elements
            //that has a pos < cidx && pos > pIdx
            repo.shiftDown(cIdx,pIdx);
        }
        repo.shiftTodo(cIdx,-1);

        return String.format("Shifted pos:%d to pos:%d",pIdx,cIdx);

    }

}
