import { Component, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  imports : [FormsModule],
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.html',
  styleUrl: './todo-modal.scss'
})
export class AddTodoModalComponent implements AfterViewInit {

  @Output() close = new EventEmitter<void>();
  @ViewChild('input') inputRef!: ElementRef;

  todoText = '';

  constructor(private http:HttpClient) {}

  ngAfterViewInit() {
    this.inputRef.nativeElement.focus();  
  }

  submit() {
    if (this.todoText.trim()) {
      console.log('Add todo:', this.todoText);

      this.http.post("http://localhost:8080/todo/add",{
        name: this.todoText,
      }).subscribe({
        next: (response)=>{
          console.log("todo create: ",response)
          this.close.emit();
        },
        error: (err)=>{
          console.error("Failed to create todo",err)
        }
      })

      this.close.emit();
    }
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('backdrop')) {
      this.close.emit();
    }
  }

}