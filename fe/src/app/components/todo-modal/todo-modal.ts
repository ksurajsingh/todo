import { Component, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule, NonNullableFormBuilder } from '@angular/forms';

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


  constructor(private fb: NonNullableFormBuilder, private http: HttpClient) {
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

      this.http.post("http://localhost:8080/todo/add", {
        name: this.form.controls.name.value,
      }).subscribe({
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