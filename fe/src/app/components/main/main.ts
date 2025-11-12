import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { todoResponse } from '../../models/todo.models';
import { todoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { switchMap, Subject, takeUntil, timer, tap } from 'rxjs';
import { DragDropModule,CdkDragDrop,moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-main',
  imports: [CommonModule,DragDropModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})


export class Main implements OnInit{

  todos: todoResponse[] = [];
  private destroy$=new Subject<void>();

  constructor(
    private todoService:todoService,
    private cdr:ChangeDetectorRef
  ){}

  drop(event: CdkDragDrop<any[]>){
    const prev_idx=event.previousIndex;
    const cur_idx=event.currentIndex;
    moveItemInArray(
      this.todos,
      prev_idx,
      cur_idx
    )

    this.todoService.reorderTodos(prev_idx,cur_idx)
    .subscribe({
      next: (res: any)=>console.log("reordered, result: ",res),
      error: (err: any)=>console.log("failed",err)
    })
  }

  ngOnInit(): void {
    timer(0,50000)
    .pipe(
      takeUntil(this.destroy$),
      switchMap(()=>this.todoService.getTodos()),
      tap(data => console.log("first item", data[0])))
    .subscribe(data=>{
      this.todos=data;
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy():void{
    this.destroy$.next(),
    this.destroy$.complete()
  }

}
