import { Observable } from "rxjs/internal/Observable";
import { todo } from "../models/todo.models";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class todoService{
    private apiURL="http://localhost:8080/todo/all"

    constructor(private http:HttpClient){}

    getTodos():Observable<todo[]>{
        return this.http.get<todo[]>(this.apiURL);
    }
}