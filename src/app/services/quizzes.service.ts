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

  //GET START
  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizzesUrl);
  }


  getQuiz(id: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/${id}`;
    return this.http.get<Quiz>(url);
  }


  searchQuizzes(search: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/search/${search}`;
    return this.http.get<Quiz>(url);
  }
  //GET END


  //UPDATE START
  insertQuestionIntoQuiz(insertQuestionObj: {quizID: string, questionID: string}): Observable<any> {
    const url = `${this.quizzesUrl}/${insertQuestionObj.quizID}/questions/${insertQuestionObj.questionID}`;
    return this.http.put(url, insertQuestionObj, this.httpOptions);
  }
  //UPDATE END


  //CREATE START
  createQuiz(quiz: { name: string, questionIDs: string[] }): Observable<any> {
    return this.http.post<any>(this.quizzesUrl, quiz, this.httpOptions);
  }
  //CREATE END




}
