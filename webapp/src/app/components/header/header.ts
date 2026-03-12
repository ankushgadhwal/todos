import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskUiService } from '../../service/shared/task-ui-service';

export type HeaderView = 'all' | 'today' | 'done';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  @Input() pendingCount: number = 0;
  @Input() totalCount: number = 0;
  @Input() activeView: HeaderView = 'all';

  @Output() viewChange = new EventEmitter<HeaderView>();

  constructor(private taskUi: TaskUiService) {}

  get completionPercent(): number {
    if (this.totalCount === 0) return 0;
    return Math.round(((this.totalCount - this.pendingCount) / this.totalCount) * 100);
  }

  setView(view: HeaderView): void {
    this.activeView = view;
    this.viewChange.emit(view);
  }

  onAddTask(): void {
    this.taskUi.openAddForm();
  }
}
