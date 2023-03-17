import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ToDo } from 'src/app/models/ToDos/todo';
import { CreateUpdateToDoDTO } from 'src/app/models/ToDos/todo.dto';
import { HttpService } from '@services/http/http.service';
import { APIResponse } from '@services/http/http.types';



@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpService
  ) { }

  public list(done:boolean): Observable<APIResponse<ToDo[]>>{
    var url = "https://localhost:7032/api/todos?loadDone="+done;
    return this.http.get(url);
  }

  public post(data: ToDo): Observable<APIResponse<ToDo>> {
    var url = "https://localhost:7032/api/todos";
    return this.http.post(url, new CreateUpdateToDoDTO(data));
  }

  public put(data: ToDo): Observable<APIResponse<ToDo>> {
    var url = `https://localhost:7032/api/todos/${data.id}`;
    return this.http.put(url, new CreateUpdateToDoDTO(data));
  }

  public delete(id: number): Observable<APIResponse<ToDo>> {
    var url = `https://localhost:7032/api/todos/${id}`;
    return this.http.delete(url);
  }
  

}
