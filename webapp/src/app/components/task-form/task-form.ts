import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskUiService } from '../../service/shared/task-ui-service';
import type { Task, TaskForm } from '../../types/task';
import { TaskService } from '../../service/task';


@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})

export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() cancelled = new EventEmitter<void>();
  private taskService = inject(TaskService);

  constructor(private taskUi: TaskUiService) { }

  submitted = false;
  form: TaskForm = this.emptyForm();

  task = this.taskService.task;

  ngOnInit(): void {
    console.log(this.task());
    console.log(this.taskService.task());

  }


  onSubmit(): void {
    this.submitted = true;
    if (!this.form.title.trim()) return;

    const task: Task = {
      ...this.form,
      title: this.form.title.trim(),
      description: this.form.description?.trim() || '',
      completed: false,
      createdAt: new Date(),
    };


    this.taskService.addTask(task).subscribe({
      next: (res) => {
        // This block is executed on a successful response
        console.log('Post successful, response ID:', res);
      },
      error: (error) => {
        // This block is executed if an error occurs
        console.error('There was an error!', error);
      },
      complete: () => {
        // This block is executed when the observable completes
        console.log('Request complete.');
      }
    });
    this.reset();
    this.taskUi.closeAddForm();
  }

  onCancel(): void {
    this.reset();
    this.taskUi.closeAddForm();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.onCancel();
    }
  }

  private reset(): void {
    this.submitted = false;
    this.form = this.emptyForm();
  }

  private emptyForm(): TaskForm {
    return { title: '', description: '' };
  }
}
