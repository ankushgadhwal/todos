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

updateTask(updated: Task): void {
    this.http.put<Task>(`${this.apiUrl}/${updated.id}`, updated).subscribe({
      next: (response: any) => {
        // Handle both response shapes:
        // Shape A — API returns the task directly:  { id, title, ... }
        // Shape B — API returns wrapped:            { message, task: { id, ... } }
        const saved: Task = response?.task ?? response;
        console.log(saved);

        if (saved?.id) {
          // ✅ update just that one row in the signal
          this.tasks.update(all =>
            all.map(t => t.id === saved.id ? { ...t, ...saved } : t)
          );
        } else {
          // ✅ fallback — reload full list if response shape is unexpected
          this.loadTasks();
        }
      },
      error: err => this.error.set(err.message)
    });
  }

  // updateTask(updated: Task): void {
  //   this.http.put<Task>(`${this.apiUrl}/${updated.id}`, updated).pipe(
  //     tap(saved => {
  //       // ✅ Option A — replace just that one item in the signal instantly
  //       console.log(saved);

  //       this.tasks.update(all =>
  //         all.map(t => (t.id === saved.id ? { ...t, ...saved } : t))
  //       );
  //     }),
  //     // ✅ Option B — also reload full list to stay 100% in sync with server
  //     // tap(() => this.loadTasks())
  //   ).subscribe({
  //     error: err => this.error.set(err.message)
  //   });
  // }

  // getTaskById(id: number): void {
  //   this.http.get<Task>(this.apiUrl + `/${id}`).subscribe({
  //     next: data => {
  //       this.task.set(data); console.log(this.task());
  //     },
  //     error: err => { console.log(err.message); }
  //   });
  // }
}
