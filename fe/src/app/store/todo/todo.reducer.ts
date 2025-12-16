import { createReducer, on } from '@ngrx/store';
import { initialState } from './todo.state';
import { loadTodos, loadTodosSuccess, loadTodosFailure } from './todo.actions';

export const TodoReducer = createReducer(
  initialState,

  on(loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  })),

  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
