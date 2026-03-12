import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskUiService {
   showAddForm = signal(false);

  openAddForm()  { this.showAddForm.set(true);  }
  closeAddForm() { this.showAddForm.set(false); }
}
