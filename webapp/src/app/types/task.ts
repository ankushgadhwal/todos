export interface Task {
  id?: string,
  title: string,
  description?: string,
  completed: boolean,
  createdAt: Date;
  updatedAt?: Date;
}

export interface TaskForm {
  title: string;
  description?: string;
}

export interface EditTaskForm {
  id: string,
  title: string,
  description?: string,
  completed: boolean,
  createdAt: Date;
  updatedAt: Date;
}
