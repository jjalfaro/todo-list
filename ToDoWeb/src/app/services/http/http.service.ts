import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '@models/ToDos/todo';
import { CreateUpdateToDoDTO } from '@models/ToDos/todo.dto';
import { APIResponse } from '@services/http/http.types';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) 
  { }

  public get(url: string): Observable<APIResponse<ToDo[]>> {
    
    return this.httpClient.get<APIResponse<ToDo[]>>(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  public post(url: string, data: CreateUpdateToDoDTO = null): Observable<APIResponse<ToDo>> {
    return this.httpClient.post<APIResponse<ToDo>>(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public put(url: string, data: CreateUpdateToDoDTO = null): Observable<APIResponse<ToDo>> {
    return this.httpClient.put<APIResponse<ToDo>>(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public delete(url: string): Observable<APIResponse<ToDo>> {
    return this.httpClient.delete<APIResponse<ToDo>>(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
