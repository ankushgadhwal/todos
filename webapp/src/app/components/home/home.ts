import { Component, inject } from '@angular/core';
import { TaskFormComponent } from "../task-form/task-form";
import { TaskUiService } from '../../service/shared/task-ui-service';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from "../task-list/task-list";
import { TaskService } from '../../service/task';
import type { Task } from '../../types/task';

@Component({
  selector: 'app-home',
  imports: [TaskFormComponent, CommonModule, TaskListComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  constructor(public taskUi: TaskUiService, public taskSvc: TaskService) { }
  selectedTask: Task | null = null;

  ngOnInit(): void {
    this.taskSvc.loadTasks(); // fetch once on page load
    //comment some code
  }

  onTaskAdded(task: any): void {
    console.log('New Task Added:', task);
    this.taskUi.closeAddForm();
  }

  onCancel(): void {
    this.taskUi.closeAddForm();
  }

  updateTask(taskId: any): void {
    const task = this.taskSvc.getTaskByGG(taskId);
    this.taskSvc.getTaskById(taskId);
    this.selectedTask = this.taskSvc.task();
    console.log(task);
    this.taskUi.openAddForm();
  }
}
