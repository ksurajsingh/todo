import { Component, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { todoService } from '../../services/todo.service';
import { todoRequest } from '../../models/todo.models';

@Component({
  imports: [FormsModule,ReactiveFormsModule],
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.html',
  styleUrl: './todo-modal.scss'
})
export class AddTodoModalComponent implements AfterViewInit {

  @Output() close = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<{ name: string, description: string }>()
  @ViewChild('input') inputRef!: ElementRef;


  form: FormGroup<{ name: FormControl<string>; description: FormControl<string> }>;


  constructor(private Tservice:todoService, private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngAfterViewInit() {
    this.inputRef.nativeElement.focus();
  }

  submit() {
    if (this.form.valid) {
      this.taskAdded.emit(this.form.getRawValue());
      const raw=this.form.getRawValue();
      const reqBody:todoRequest={
        name:raw.name,
        description:raw.description
      }

      this.Tservice.addTodo(reqBody)
      .subscribe({
        next: (response) => {
          console.log("todo create: ", response)
          this.close.emit();
        },
        error: (err) => {
          console.error("Failed to create todo", err)
        }
      })

      this.form.reset();
      this.close.emit();
    }
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('backdrop')) {
      this.close.emit();
    }
  }

}