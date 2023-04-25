import { Question } from "../../questions/models/question-model";

export interface Quiz {
  _id?: string;
  name: string;
  questions: Question[];
}
