import { Component, OnInit } from '@angular/core';
import { ToDo } from '@models/ToDos/todo';
import { TodoService } from '@services/todos/todo.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'todo-done',
  templateUrl: './todo-done.page.html',
  styleUrls: ['./todo-done.page.css']
})
export class ToDoDonePage implements OnInit {

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
    const response = await firstValueFrom(this.todosService.list(true));
      if(response.isSuccess) {
        this.todos = response.data;
      }
  }

  public async changeStatus(index:number,todo:ToDo){
    todo.done = !todo.done;
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

}
