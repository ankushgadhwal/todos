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
  task = signal<Task | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  loadTasks(): void {
    // The .get method returns an Observable
    this.http.get<Task[]>(this.apiUrl).pipe(
      tap({
        next: data => { this.tasks.set(data); this.loading.set(false); },
        error: err => { this.error.set(err.message); this.loading.set(false); }
      })
    ).subscribe();
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.apiUrl + `/${task.id}`, task);
  }

  // getTaskById(id: number): void {
  //   this.http.get<Task>(this.apiUrl + `/${id}`).subscribe({
  //     next: data => {
  //       this.task.set(data); console.log(this.task());
  //     },
  //     error: err => { console.log(err.message); }
  //   });
  // }
}
