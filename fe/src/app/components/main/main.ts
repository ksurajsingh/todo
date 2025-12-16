import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Subject, take } from 'rxjs';
import { DragDropModule,CdkDragDrop,moveItemInArray } from '@angular/cdk/drag-drop'
import { Store } from '@ngrx/store';
import { todoResponse } from '../../models/todo.models';
import { todoService } from '../../services/todo.service';
import { loadTodos } from '../../store/todo/todo.actions';
import { selectAllTodos,selectLoading } from '../../store/todo/todo.selectors';

@Component({
  selector: 'app-main',
  imports: [CommonModule,DragDropModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})


export class Main implements OnInit,OnDestroy{
  
  todos$;
  loadingTodos$;

  constructor(
    private todoService:todoService,
    private store:Store
  ){
    this.todos$ = this.store.select(selectAllTodos)
    this.loadingTodos$ = this.store.select(selectLoading)
  }

  private destroy$=new Subject<void>();

  drop(event: CdkDragDrop<todoResponse[]>){
    const prev_idx=event.previousIndex;
    const cur_idx=event.currentIndex;
    
    this.todos$.pipe(take(1)).subscribe(todos=>{

      const arr = [...todos]
      moveItemInArray( arr, prev_idx, cur_idx )

      this.todoService.reorderTodos(prev_idx,cur_idx)
      .subscribe({
        next: (res: any)=>console.log("reordered, result: ",res),
        error: (err: any)=>console.log("failed",err)
      })

    })

  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos())
  }

  ngOnDestroy():void{
    this.destroy$.next(),
    this.destroy$.complete()
  }

}
