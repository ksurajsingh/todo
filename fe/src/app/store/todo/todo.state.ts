import { todoResponse } from "../../models/todo.models";


export interface TodoState {
    todos: todoResponse[],
    loading:boolean,
    error: string | null,
}


export const initialState: TodoState = {
    todos:[],
    loading:false,
    error:null
}