import { Observable } from "rxjs";
import { todoRequest, todoResponse } from "../models/todo.models";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "../environment/env"

@Injectable({providedIn: 'root'})
export class todoService{
    private baseAPI=env.serverURL;
    private apiURL=this.baseAPI+"/todo";

    constructor(private http:HttpClient){}

    getTodos():Observable<todoResponse[]>{
        return this.http.get<todoResponse[]>(`${this.apiURL}/all`);
    }

    reorderTodos(prevIndex:number, curIndex:number):Observable<any>{
        return this.http.patch<any>(`${this.apiURL}/reorder`,{
            prev_index:prevIndex,
            cur_index:curIndex
        })
    }

    addTodo(req:todoRequest):Observable<any>{
        return this.http.post<any>(`${this.apiURL}/add`,req)
    }

    updateTodo(id:number,req:todoRequest):Observable<todoResponse>{
        return this.http.patch<todoResponse>(`${this.apiURL}/update/${id}`,req)
    }
}
