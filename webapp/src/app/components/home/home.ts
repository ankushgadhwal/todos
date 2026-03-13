import { Component, inject } from '@angular/core';
import { TaskFormComponent } from "../task-form/task-form";
import { TaskUiService } from '../../service/shared/task-ui-service';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from "../task-list/task-list";
import { TaskService } from '../../service/task';

@Component({
  selector: 'app-home',
  imports: [TaskFormComponent, CommonModule, TaskListComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  constructor(public taskUi: TaskUiService, public taskSvc: TaskService) {}

  ngOnInit(): void {
    this.taskSvc.loadTasks(); // fetch once on page load
    console.log("init");

  }

  onTaskAdded(task: any): void {
    console.log('New Task Added:', task);
    this.taskUi.closeAddForm();
  }

  onCancel(): void {
    this.taskUi.closeAddForm();
  }
}
