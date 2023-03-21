import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToDo } from 'src/app/models/ToDos/todo';
import { TodoService } from 'src/app/services/todos/todo.service';
import { firstValueFrom } from 'rxjs';
import dayjs from "dayjs";
// Importing dependent plugins
import utc from "dayjs/plugin/utc";
import { APIResponse } from '@services/http/http.types';
import { MatSnackBar } from '@angular/material/snack-bar'


@Component({
  selector: 'todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.css']
})

export class ToDoPage implements OnInit {
  
  public todos: ToDo[];
  public currentToDo: ToDo;
  public description: string;
  public date: Date;
  public hour:string;
  public minutes:string;
  public timeOfDay:string;
  public dateInvalid:boolean=false;
  public currentIndex:number;
  public loading:boolean=false;

  constructor(
    private todosService:TodoService,
    private _snackbar:MatSnackBar
  ){
    this.todos = [];
    var utc = require('dayjs/plugin/utc');
    dayjs.extend(utc);
  }


  public ngOnInit(): void {
    this.loadToDos();
  }

  public async loadToDos(){
    this.loading = true;
    const response = await firstValueFrom(this.todosService.list(false));
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

  public async completeTodo(index:number,todo:ToDo){
    this.loading = true;
    todo.done = true;
    const response = await firstValueFrom(this.todosService.put(todo));
    if(response.isSuccess){
      this.todos.splice(index,1);
      this._snackbar.open(`Tarea ${todo.id} completada`,"cerrar",{duration: 5000});
      this.loading = false;
    }else{
      this._snackbar.open(`Error al completar tarea ${todo.id}`,"cerrar",{duration: 5000});
      this.showErrorMessages(response.messages);
      this.loading = false;
    }
  }

  public async deleteTodo(index:number,id:number){
    this.loading=true;
    const response = await firstValueFrom(this.todosService.delete(id));
    if(response.isSuccess){
      this._snackbar.open(`Tarea ${id} eliminada`,"cerrar",{duration: 5000});
      this.todos.splice(index,1);
    }else{
      this._snackbar.open(`Error al eliminar la tarea ${id}`,"cerrar",{duration: 5000});
      this.showErrorMessages(response.messages);
      this.loading = false;
    }
  }

  public editTodo(index:number,todo:ToDo){
    this.currentIndex = index;
    this.currentToDo = todo;
    this.description = todo.description;
    this.date = dayjs(todo.dueDate).toDate();
    this.hour = dayjs(todo.dueDate).format("h");
    this.minutes = dayjs(todo.dueDate).format("mm");
    this.timeOfDay = dayjs(todo.dueDate).format('A');
    this.todos.splice(index,1);
  }

  public cancel(){
    this.loadToDos();
    this.cleanForm();
  }

  public cleanForm(){
    this.currentToDo = null;
    this.currentIndex = null;
    this.description = "";
    this.date = null;
    this.hour = "";
    this.minutes = "";
    this.timeOfDay = "";
  }


  updateDate(event: any){
    this.date = dayjs(event.target.value).toDate();
  }

  public isPastDue(dueDate:Date){
    const now = new Date().toISOString();
    return new Date(dueDate).toISOString() <= now;
  }

  public validForm(){
    if(this.description == undefined || this.description == ""){
      return false;
    }
    if(this.date == undefined || this.date== null){
      return false;
    }
    if(this.hour == undefined || this.hour == ""){
      return false;
    }
    if(this.minutes == undefined || this.minutes == ""){
      return false;
    }
    if(this.timeOfDay == undefined || this.timeOfDay == ""){
      return false;
    }
    return true;
  }
  public checkInvalid (){
    if(this.date == undefined || this.date== null){
      this.dateInvalid = true;
    }else{
      this.dateInvalid = false;
    }
  }

  public async save(){
    this.loading = true;
    var hour24 = this.hour;

    if(this.timeOfDay == "AM" && this.hour == "12"){
      hour24 ="0";
    }
    if(this.timeOfDay == "PM" && this.hour != "12"){
      hour24 = (parseInt(this.hour) + 12).toString() ;
    }
    var currentDate = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate(), parseInt(hour24) ,parseInt(this.minutes),0,0);
    
    if(currentDate < new Date() && this.currentToDo == null || this.currentToDo == undefined){
      this._snackbar.open("Fecha debe ser mayor a la fecha actual","cerrar",{duration: 5000});
      return;
    }
    let response: APIResponse<ToDo> = null;
    if(!!this.currentToDo){
      this.currentToDo.description = this.description;
      this.currentToDo.dueDate = currentDate;
      response = await firstValueFrom(this.todosService.put(this.currentToDo));
    }else{
      this.currentToDo = new ToDo({
        description: this.description,
        dueDate: currentDate,
        done: false
      });

      response = await firstValueFrom(this.todosService.post(this.currentToDo));
    }

    if(response.isSuccess){
      this._snackbar.open("Tarea agregada","cerrar",{duration: 5000});
      this.loadToDos();
      this.cleanForm();
      this.loading = false;
    }else{
      this.loading = false;
      this.showErrorMessages(response.messages);

    }
  }

  public showErrorMessages(messages:string[]){
    messages.forEach(message => {
      this._snackbar.open(message,"cerrar",{duration: 5000});  
    });
  }

}
