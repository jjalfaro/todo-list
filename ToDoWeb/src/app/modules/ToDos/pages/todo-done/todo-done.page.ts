import { Component, OnInit } from '@angular/core';
import { ToDo } from '@models/ToDos/todo';
import { TodoService } from '@services/todos/todo.service';
import { firstValueFrom } from 'rxjs';
import * as dayjs from "dayjs";
// Importing dependent plugins
import utc from "dayjs/plugin/utc";
import { APIResponse } from '@services/http/http.types';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'todo-done',
  templateUrl: './todo-done.page.html',
  styleUrls: ['./todo-done.page.css']
})
export class ToDoDonePage implements OnInit {

  public todos: ToDo[];
  public messages:string [];
  public loading:boolean=false;
  
  constructor(
    private todosService:TodoService,
    private _snackbar:MatSnackBar
  ){
    this.todos = [];
  }

  public ngOnInit(): void {
    this.loadToDos();
  }

  public async loadToDos(){
    this.loading = true;
    const response = await firstValueFrom(this.todosService.list(true));
      if(response.isSuccess) {
          this.todos = response.data;
          this.loading = false;
      }else{
        this.loading = false;
        this._snackbar.open("Error cargando las tareas","cerrar",{duration: 5000});
        this.showErrorMessages(response.messages)
      }
  }

  public getDisplayDate(dueDate:Date){
    return dayjs(dueDate).utc(true).format();
}

  public async changeStatus(index:number,todo:ToDo){
    this.loading = true;
    todo.done = !todo.done;
    const response = await firstValueFrom(this.todosService.put(todo));
    if(response.isSuccess){
      this.todos.splice(index,1);
      this._snackbar.open(`Tarea ${todo.id} movida a pendientes`,"cerrar",{duration: 5000});
    }else{
      this._snackbar.open(`Error al mover a pendientes la tarea ${todo.id}`,"cerrar",{duration: 5000});
      this.showErrorMessages(response.messages);
    }
    this.loading = false;
  }

  public async deleteTodo(index:number,id:number){
    this.loading = true;
    const response = await firstValueFrom(this.todosService.delete(id));
    if(response.isSuccess){
      this._snackbar.open(`Tarea ${id} eliminada `,"cerrar",{duration: 5000});
      this.todos.splice(index,1);
    }else{
      this._snackbar.open(`Error al eliminar la tarea ${id}`,"cerrar",{duration: 5000});
      this.showErrorMessages(response.messages );
    }
    this.loading = false;
  }

  public showErrorMessages(messages:string[]){
    messages.forEach(message => {
      this._snackbar.open(message,"cerrar",{duration: 5000});  
    });
  }

}
