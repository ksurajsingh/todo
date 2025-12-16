import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { todoService } from '../../services/todo.service';
import { loadTodos, loadTodosSuccess, loadTodosFailure } from './todo.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TodoEffects {
  private actions = inject(Actions);
  private todoService = inject(todoService);

  loadTodos$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadTodos),           // listen for loadTodos action
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map(todos => loadTodosSuccess({ todos })),        // success
          catchError(error => of(loadTodosFailure({ error: error.message })))  // failure
        )
      )
    )
  );
}
