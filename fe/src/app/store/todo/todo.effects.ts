import { PLATFORM_ID,inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { todoService } from '../../services/todo.service';
import { loadTodos, loadTodosSuccess, loadTodosFailure, addTodo, addTodoSuccess, addTodoFailure, updateTodo, updateTodoSuccess, updateTodoFailure } from './todo.actions';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class TodoEffects {
  private actions = inject(Actions);
  private todoService = inject(todoService);
  private platformId = inject(PLATFORM_ID);

  loadTodos$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadTodos),           // listen for loadTodos action
      filter(()=>isPlatformBrowser(this.platformId)),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map(todos => loadTodosSuccess({ todos })),        // success
          catchError(error => of(loadTodosFailure({ error: error.message })))  // failure
        )
      )
    )
  );

  addTodo$ = createEffect(()=>
    this.actions.pipe(
      ofType(addTodo),
      filter(()=>isPlatformBrowser(this.platformId)),
      switchMap(({req})=>
        this.todoService.addTodo(req).pipe(
          map((response)=>addTodoSuccess({response})),
          catchError(error=>of(addTodoFailure({ error: error.message })))
        )
      )
    )
  );

  addTodoSuccess$ = createEffect(()=>
    this.actions.pipe(
      ofType(addTodoSuccess),
      filter(()=>isPlatformBrowser(this.platformId)),
      map(()=>loadTodos()),
    )
  );

  updateTodo$ = createEffect(()=>
    this.actions.pipe(
      ofType(updateTodo),
      switchMap(({id,req})=>
        this.todoService.updateTodo(id,req).pipe(
          map(()=>updateTodoSuccess()),
          catchError(error=>of(updateTodoFailure({ error: error.message})))
        )
      )
    )
  );

  updateTodoSuccess$ = createEffect(()=>
    this.actions.pipe(
      ofType(updateTodoSuccess),
      map(()=>loadTodos())
    )
  );

}
