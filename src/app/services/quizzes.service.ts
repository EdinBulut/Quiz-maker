import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz-model';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  // private quizzesUrl = '/questions';
  private quizzesUrl = 'http://localhost:3000/quizzes';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Quiz> {
    return this.http.get<Quiz>(this.quizzesUrl);
  }


  getQuiz(search: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/${search}`;
    return this.http.get<Quiz>(url);
  }
  
  searchQuizzes(search: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/${search}`;
    return this.http.get<Quiz>(url);
  }

}
