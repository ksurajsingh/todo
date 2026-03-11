import { Component, OnInit } from '@angular/core';
import { todo } from '../../models/todo.models';
import { todoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { interval, switchMap, Subject, takeUntil } from 'rxjs';

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
    interval(5000)
    .pipe(
      takeUntil(this.destroy$),
      switchMap(()=>this.todoService.getTodos()))
    .subscribe(data=>{
      this.todos=data;
      this.cdr.detectChanges();
    })
  }
}
