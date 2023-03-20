import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

import {ToDo} from '../../Models/ToDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoServiceService {

  constructor( 
    private http:HttpClient 
  ) { }

  public getPendingToDos(): Observable<ToDo[]>{
    return this.http.get<ToDo[]>('https://localhost:7032/api/todos?false',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
