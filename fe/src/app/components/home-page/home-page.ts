import { Component, HostListener, signal } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Main } from '../main/main'
import { AddTodoModalComponent } from '../todo-modal/todo-modal';

@Component({
  selector: 'app-home-page',
  imports: [Sidebar,Main,AddTodoModalComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  showTodoModal = signal(false);

 @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {

    if (event.ctrlKey && event.key === 'q') {
      event.preventDefault();   // prevent browser default action
      this.showTodoModal.set(true);
    }

    if(event.key === 'Escape'){
      this.showTodoModal.set(false);
    }

  }

}
