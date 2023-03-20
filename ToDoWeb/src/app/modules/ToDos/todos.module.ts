import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDosRoutingModule } from './todos-routing.module';
import { ToDoPage } from './pages/todos/todos.page';
import { ToDoDonePage } from './pages/todo-done/todo-done.page';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToDoPage,
    ToDoDonePage
  ],
  imports: [
    CommonModule,
    ToDosRoutingModule,
    FormsModule
  ]
})
export class ToDosModule { }