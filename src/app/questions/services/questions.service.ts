import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  // private questionsUrl = '/questions';
  private questionsUrl = 'http://localhost:3000/questions';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }


  getQuestions(searchValue?: string): Observable<Question[]> {
    const url = searchValue ? `${this.questionsUrl}/search/${searchValue}` : this.questionsUrl 
    return this.http.get<Question[]>(url);
  }


  searchQuestions(searchValue: string): Observable<Question> {
    const url = `${this.questionsUrl}/search/${searchValue}`;
    return this.http.get<Question>(url);
  }


  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question, this.httpOptions);
  }


  deleteQuestion(questionID: string): Observable<Question> {
    const url = `${this.questionsUrl}/${questionID}`;
    return this.http.delete<Question>(url, this.httpOptions);
  }

}
