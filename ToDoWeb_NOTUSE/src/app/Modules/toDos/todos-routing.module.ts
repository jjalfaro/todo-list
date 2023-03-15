import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDosPage } from './pages/toDos/toDos.component';


const routes: Routes = [
  {
    path: '',
    component: ToDosPage
  },
  {
    path: '/:done',
    component: ToDosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
