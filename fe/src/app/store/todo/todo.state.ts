import { todoResponse } from "../../models/todo.models";


export interface TodoState {
    todos: todoResponse[],
    loadingAdd:boolean,
    loadingFetch:boolean,
    loadingUpdate:boolean,
    error: string | null,
}


export const initialState: TodoState = {
    todos:[],
    loadingAdd:false,
    loadingFetch:false,
    loadingUpdate:false,
    error:null
}
