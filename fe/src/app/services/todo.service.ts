import { Observable } from "rxjs";
import { todo } from "../models/todo.models";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class todoService{
    private apiURL="http://localhost:8080/todo"

    constructor(private http:HttpClient){}

    getTodos():Observable<todo[]>{
        return this.http.get<todo[]>(`${this.apiURL}/all`);
    }
}