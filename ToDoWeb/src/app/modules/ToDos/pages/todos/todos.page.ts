import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToDo } from 'src/app/models/ToDos/todo';
import { TodoService } from 'src/app/services/todos/todo.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.css']
})

export class ToDoPage implements OnInit {
  public todos: ToDo[];


  constructor(
    private todosService:TodoService
  ){
    this.todos = [];
  }


  public ngOnInit(): void {
    this.loadToDos();
  }

  public async loadToDos(){
    const response = await firstValueFrom(this.todosService.list(false));
      if(response.isSuccess) {
        this.todos = response.data;
      }
  }

  public async completeTodo(index:number,todo:ToDo){
    todo.done = true;
    const response = await firstValueFrom(this.todosService.put(todo));
    if(response.isSuccess){
      this.todos.splice(index,1);
    }
  }

  public async deleteTodo(index:number,id:number){
    const response = await firstValueFrom(this.todosService.delete(id));
    if(response.isSuccess){
      this.todos.splice(index,1);
    }
  }

  public isPastDue(dueDate:Date){
    const now = new Date().toISOString();
    return new Date(dueDate).toISOString() <= now;
  }

}
