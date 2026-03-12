import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { NotFoundComponent } from './components/not-found/not-found';
import { TaskFormComponent } from './components/task-form/task-form';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  // { path: 'add-task', component: TaskFormComponent, title: 'Add Task' },
  { path: '**', component: NotFoundComponent }


  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'admin', redirectTo: 'home', pathMatch: 'full', component: HomeComponent },
  // { path: 'home', loadChildren: () => import('./components/home/home').then(c => c.HomeComponent) },
  //  { path: '**', component: NotFoundComponent }
  // { path: 'todo', loadChildren: () => import('./components/todo/todo.module').then(m => m.TodoModule) }
];
