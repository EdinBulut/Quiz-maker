import { Task } from "../../tasks/models/task-model";

export interface Quiz {
  _id?: string;
  name: string;
  questions: Task[];
}
