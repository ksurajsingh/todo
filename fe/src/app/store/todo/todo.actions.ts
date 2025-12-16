import { createAction, props } from "@ngrx/store";
import { todoResponse } from "../../models/todo.models";

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success',props<{ todos: todoResponse[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure',props<{ error: string }>());