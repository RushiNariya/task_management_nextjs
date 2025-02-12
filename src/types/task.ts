export interface TasksParamsType {
  page: number;
  perPage: number;
  search?: string;
}

export interface TaskType {
  id: number;
  todo: string;
  completed: boolean;
  userId: string;
}
