import { createReducer, on } from '@ngrx/store';
import { initialState } from './todo.state';
import {
  loadTodos,  loadTodosSuccess,  loadTodosFailure,
  addTodo,    addTodoSuccess,    addTodoFailure,
  updateTodo, updateTodoSuccess, updateTodoFailure
} from './todo.actions';

export const TodoReducer = createReducer(
  initialState,

  on(loadTodos, (state) => ({
    ...state,
    loadingFetch: true,
    loadingAdd: false,
    loadingUpdate: false,
    error: null
  })),

  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loadingFetch: false,
    loadingAdd: false,
    loadingUpdate: false,
  })),

  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    loadingFetch: false,
    loadingAdd: false,
    loadingUpdate: false,
  })),

  on(addTodo, (state) =>({
    ...state,
    loadingFetch: false,
    loadingAdd: true,
    loadingUpdate: false,
    error: null
  })),

  on(addTodoSuccess, (state, { response }) => ({
    ...state,
    response,
    loadingFetch: false,
    loadingAdd: false,
    loadingUpdate: false,
  })),

  on(addTodoFailure, (state, { error }) => ({
    ...state,
    error,
    loadingFetch: false,
    loadingAdd: false,
    loadingUpdate: false,
  })),

  on(updateTodo, (state) =>({
    ...state,
    loadingFetch: false,
    loadingAdd: false,
    loadingUpdate: true,
    error: null
  })),

  on(updateTodoSuccess, (state) => ({
    ...state,
    loadingFetch: false,
    loadingAdd: false,
    loadingUpdate: false,
  })),

  on(updateTodoFailure, (state, { error }) => ({
    ...state,
    error,
    loadingFetch: false,
    loadingAdd: false,
    loadingUpdate: false,
  })),

);
