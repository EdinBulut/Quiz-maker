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

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizzesUrl);
  }
  

  createQuiz(quiz: {name: string, questionIDs: string[]}): Observable<any> {
    return this.http.post<any>(this.quizzesUrl, quiz, this.httpOptions);
  }


  getQuiz(id: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/${id}`;
    return this.http.get<Quiz>(url);
  }
  
  searchQuizzes(search: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/search/${search}`;
    return this.http.get<Quiz>(url);
  }

}
