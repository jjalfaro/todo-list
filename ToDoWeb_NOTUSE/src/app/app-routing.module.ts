import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('@posts/posts.module').then(m => m.PostsModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('@gallery/gallery.module').then(m => m.GalleryModule)
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
