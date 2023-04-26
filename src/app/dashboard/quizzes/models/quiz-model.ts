import { Task } from "../../questions/models/task-model";

export interface Quiz {
  _id?: string;
  name: string;
  questions: Task[];
}
