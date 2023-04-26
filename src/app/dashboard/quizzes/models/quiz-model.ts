import { Task } from "../../tasks/models/task-model";

export interface Quiz {
  name: string,
  questions: Task[],
  _id?: string
}
