import { Component, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { todoService } from '../../services/todo.service';
import { todoRequest } from '../../models/todo.models';
import { Store } from '@ngrx/store';
import { loadTodos } from '../../store/todo/todo.actions';

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

  private store = inject(Store)


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
      const raw=this.form.getRawValue();
      const reqBody:todoRequest={
        name:raw.name,
        description:raw.description
      }

      this.Tservice.addTodo(reqBody)
      .subscribe({
        next: (response) => {
          console.log("todo create: ", response)
          this.store.dispatch(loadTodos())
          this.form.reset();
          this.close.emit();
        },
        error: (err) => {
          console.error("Failed to create todo", err)
        }
      })

    }
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('backdrop')) {
      this.close.emit();
    }
  }

}
