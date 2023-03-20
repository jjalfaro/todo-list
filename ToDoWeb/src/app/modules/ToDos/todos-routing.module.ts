import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoDonePage } from './pages/todo-done/todo-done.page';
import { ToDoPage } from './pages/todos/todos.page';

const routes: Routes = [
  {
    path: '',
    component: ToDoPage
  },
  {
    path: 'todos',
    component: ToDoPage
  },
  {
    path: 'todos/DoneTasks',
    component: ToDoDonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDosRoutingModule { }