import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskUiService } from '../../service/shared/task-ui-service';
import type { EditTaskForm, Task, TaskForm } from '../../types/task';
import { TaskService } from '../../service/task';


@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})

export class TaskFormComponent {
  @Input() editTask: Task | null = null;
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() cancelled = new EventEmitter<void>();
  private taskService = inject(TaskService);

  constructor(private taskUi: TaskUiService) { }

  submitted = false;
  form: TaskForm = this.emptyForm();
  task = this.taskService.task;


  get isEditMode(): boolean {
    return !!this.editTask;
  }

  ngOnInit(): void {
    if (this.editTask) {
      this.prefillForm(this.editTask);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editTask']) {
      if (this.editTask) {
        this.prefillForm(this.editTask);
      } else {
        this.reset();
      }
    }
  }

  private prefillForm(task: Task): void {
    this.form = {
      title: task.title ?? '',
      description: task.description ?? '',
    };
  }


  onSubmit(): void {
    this.submitted = true;
    if (!this.form.title.trim()) return;

    if (this.isEditMode) {
      const task: Task = {
        ...this.editTask!,
        ...this.form,
        title: this.form.title.trim(),
      };
      this.taskService.updateTask(task).subscribe({
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
      }
      );
    } else {
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
    }
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
