import { Component, ElementRef, inject, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Subject, take } from 'rxjs';
import { DragDropModule,CdkDragDrop,moveItemInArray } from '@angular/cdk/drag-drop'
import { Store } from '@ngrx/store';
import { todoRequest, todoResponse } from '../../models/todo.models';
import { todoService } from '../../services/todo.service';
import { loadTodos, updateTodo, updateTodoSuccess } from '../../store/todo/todo.actions';
import { selectAllTodos,selectLoadingAdd } from '../../store/todo/todo.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [CommonModule,DragDropModule,FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})


export class Main implements OnInit,OnDestroy{

  todos$;
  loadingTodos$;

  private store = inject(Store);
  private actions = inject(Actions);

@ViewChildren('input') inputs!: QueryList<ElementRef>;

  // edit values
  editingId: number | null=null;
  editName="";
  editDescription="";
  shouldFocus=false;

  constructor(
    private todoService:todoService,
  ){
    this.todos$ = this.store.select(selectAllTodos)
    this.loadingTodos$ = this.store.select(selectLoadingAdd)
  }

  private destroy$=new Subject<void>();

  startEdit(todo: todoResponse) {
    this.editingId = todo.id;
    this.editName = todo.name;
    this.editDescription = todo.description;
    setTimeout(() => {
    const input = document.querySelector('input.home-todo-name') as HTMLElement;
    input?.focus();
    }, 50);
  }


  cancelEdit(){
    this.editingId=null;
  }

  saveEdit(id: number){
    console.log("inside saving")
    const req:todoRequest={
      name: this.editName,
      description: this.editDescription
    }
    this.store.dispatch(updateTodo({id,req}))
  }

  drop(event: CdkDragDrop<todoResponse[]>){
    const prev_idx=event.previousIndex;
    const cur_idx=event.currentIndex;

    this.todos$.pipe(take(1)).subscribe(todos=>{

      const arr = [...todos]
      moveItemInArray( arr, prev_idx, cur_idx )

      this.todoService.reorderTodos(prev_idx,cur_idx)
      .subscribe({
        next: (res: any)=>{
          console.log("reordered, result: ",res),
          this.store.dispatch(loadTodos())
        },
        error: (err: any)=>console.log("failed",err)
      })

    })

  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos())
    this.actions.pipe(
      ofType(updateTodoSuccess))
      .subscribe({
        next:()=>{
          this.cancelEdit();
        },
        error:(err)=>{
          console.error("Failed to update todo, error: ",err)
        }
      })
  }

  ngOnDestroy():void{
    this.destroy$.next(),
    this.destroy$.complete()
  }

}
