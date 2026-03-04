import { createAction, props } from "@ngrx/store";
import { todoResponse } from "../../models/todo.models";
import { todoRequest } from "../../models/todo.models";

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: todoResponse[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: string }>());

export const addTodo = createAction('[TODO] Add Todo', props<{ req: todoRequest }>());
export const addTodoSuccess = createAction('[TODO] Add Todo Success',props<{ response:todoResponse }>());
export const addTodoFailure = createAction('[TODO] Add Todo Failure', props<{ error: string }>());

export const updateTodo = createAction('[TODO] update Todo', props<{ id: number, req: todoRequest }>())
export const updateTodoSuccess = createAction('[TODO] update Todo Success')
export const updateTodoFailure = createAction('[TODO] update Todo Failure', props<{ error: string }>())
