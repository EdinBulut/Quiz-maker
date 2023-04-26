import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../../dashboard/questions/models/question-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionAPIService {

  // private questionsUrl = '/questions';
  private questionsUrl = `${environment.baseURL}/questions`
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  constructor(private http: HttpClient) { }


  getQuestions(searchValue?: string): Observable<Task[]> {
    const url = searchValue ? `${this.questionsUrl}/search/${searchValue}` : this.questionsUrl 
    return this.http.get<Task[]>(url)
  }



  searchQuestions(searchValue: string): Observable<Task[]> {
    const url = `${this.questionsUrl}/search/${searchValue}`
    return this.http.get<Task[]>(url)
  }



  updateTask(taskID: string,  updateObj: {question: string, answer: string}): Observable<Task> {
    const url = `${this.questionsUrl}/${taskID}`;
    return this.http.put<Task>(url, updateObj, this.httpOptions);
  }


  createQuestion(question: Task): Observable<Task> {
    return this.http.post<Task>(this.questionsUrl, question, this.httpOptions);
  }



  deleteQuestion(questionID: string): Observable<Task> {
    const url = `${this.questionsUrl}/${questionID}`
    return this.http.delete<Task>(url, this.httpOptions)
  }

}
