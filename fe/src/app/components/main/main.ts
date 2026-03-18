import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { todo } from '../../models/todo.models';
import { todoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { switchMap, Subject, takeUntil, timer, tap } from 'rxjs';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit{

  todos: todo[] = [];
  private destroy$=new Subject<void>();

  constructor(
    private todoService:todoService,
    private cdr:ChangeDetectorRef
  ){}

  ngOnInit(): void {
    timer(0,5000)
    .pipe(
      tap(()=>console.log("pokemane")),
      takeUntil(this.destroy$),
      switchMap(()=>this.todoService.getTodos()),
      tap(()=>console.log("test")),
      tap(data => console.log("first item", data[0])))
    .subscribe(data=>{
      console.log("2")
      this.todos=data;
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy():void{
    this.destroy$.next(),
    this.destroy$.complete()
  }

}
