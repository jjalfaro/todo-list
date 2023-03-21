import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDosRoutingModule } from './todos-routing.module';
import { ToDoPage } from './pages/todos/todos.page';
import { ToDoDonePage } from './pages/todo-done/todo-done.page';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ToDoPage,
    ToDoDonePage
  ],
  imports: [
    CommonModule,
    ToDosRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class ToDosModule { }