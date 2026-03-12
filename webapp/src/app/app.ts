import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './service/task';
import type { Task } from './types/task';
import { HeaderComponent } from "./components/header/header";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('webapp');

}
