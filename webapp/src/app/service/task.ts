import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import type { Task } from '../types/task';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  tasks = signal<Task[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  loadTasks(): void {
    // The .get method returns an Observable
    this.http.get<Task[]>(this.apiUrl).pipe(
      tap({
        next:  data  => { this.tasks.set(data); this.loading.set(false); },
        error: err   => { this.error.set(err.message); this.loading.set(false); }
      })
    ).subscribe();
  }


  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
