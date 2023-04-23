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


  searchQuizzes(searchValue: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/search/${searchValue}`;
    return this.http.get<Quiz>(url);
  }
  //GET END


  //UPDATE START
  updateQuiz(quizID: string,  updateObj: {name?: string, addQuestions?: string[], removeQuestions?: string[]}): Observable<any> {
    const url = `${this.quizzesUrl}/${quizID}`;
    return this.http.put(url, updateObj, this.httpOptions);
  }


  insertQuestionIntoQuiz(insertQuestionObj: {quizID: string, questionID: string}): Observable<any> {
    const url = `${this.quizzesUrl}/${insertQuestionObj.quizID}/add/questions/${insertQuestionObj.questionID}`;
    return this.http.put(url, insertQuestionObj, this.httpOptions);
  }

  
  removeQuestionFromQuiz(insertQuestionObj: {quizID: string, questionIDs: string[]}): Observable<any> {
    const url = `${this.quizzesUrl}/${insertQuestionObj.quizID}/remove/questions`;
    return this.http.put(url, insertQuestionObj, this.httpOptions);
  }
  //UPDATE END


  //CREATE START
  createQuiz(quiz: { name: string, questionIDs: string[] }): Observable<any> {
    return this.http.post<any>(this.quizzesUrl, quiz, this.httpOptions);
  }
  //CREATE END




}
