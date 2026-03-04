import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectLoadingAdd = createSelector(
  selectTodoState,
  (state) => state.loadingAdd
);

export const selectError = createSelector(
  selectTodoState,
  (state) => state.error
);
