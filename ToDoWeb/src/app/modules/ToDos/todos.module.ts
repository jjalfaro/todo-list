import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDosRoutingModule } from './todos-routing.module';
import { ToDoPage } from './pages/todos/todos.page';
import { ToDoDonePage } from './pages/todo-done/todo-done.page';


@NgModule({
  declarations: [
    ToDoPage,
    ToDoDonePage
  ],
  imports: [
    CommonModule,
    ToDosRoutingModule
  ]
})
export class ToDosModule { }