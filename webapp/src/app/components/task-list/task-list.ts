import { Component, EventEmitter, inject, input, Input, InputSignal, OnChanges, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Task } from '../../types/task';


type FilterValue = 'all' | 'pending' | 'done';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskListComponent implements OnChanges {
  tasks: InputSignal<Task[]> = input.required<Task[]>();
  @Output() editTaskEvent = new EventEmitter<Task>();

  activeFilter: FilterValue = 'all';

  filters: { label: string; value: FilterValue }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Done', value: 'done' },
  ];

  toggleTask(task: Task): void {
    task.completed = !task.completed;
  }

  ngOnChanges(): void {
    this.activeFilter = 'all';
  }

  editTask(task: Task): void {
    this.editTaskEvent.emit(task);
  }
}
