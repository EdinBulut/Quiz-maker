import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../../../dashboard/quizzes/models/quiz-model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class QuizAPIService {

  private quizzesUrl = `${environment.baseURL}/quizzes`
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  constructor(private http: HttpClient) { }


  //GET START
  getQuizzes(searchValue?: string): Observable<Quiz[]> {
    const url = searchValue ? `${this.quizzesUrl}/search/${searchValue}` : this.quizzesUrl 
    return this.http.get<Quiz[]>(url);
  }


  getQuiz(id: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/${id}`
    return this.http.get<Quiz>(url)
  }


  searchQuizzes(searchValue: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/search/${searchValue}`
    return this.http.get<Quiz>(url)
  }
  //GET END





  //UPDATE START
  updateQuiz(quizID: string,  updateObj: {name?: string, addTasks?: string[], removeTasks?: string[]}): Observable<any> {
    const url = `${this.quizzesUrl}/${quizID}`;
    return this.http.put(url, updateObj, this.httpOptions);
  }


  insertTaskIntoQuiz(insertTaskObj: {quizID: string, questionID: string}): Observable<any> {
    const url = `${this.quizzesUrl}/${insertTaskObj.quizID}/add/questions/${insertTaskObj.questionID}`;
    return this.http.put(url, insertTaskObj, this.httpOptions);
  }

  
  removeTaskFromQuiz(insertTaskObj: {quizID: string, questionIDs: string[]}): Observable<any> {
    const url = `${this.quizzesUrl}/${insertTaskObj.quizID}/remove/questions`;
    return this.http.put(url, insertTaskObj, this.httpOptions);
  }
  //UPDATE END





  //CREATE START
  createQuiz(quiz: { name: string, questionIDs: string[] }): Observable<any> {
    return this.http.post<any>(this.quizzesUrl, quiz, this.httpOptions);
  }
  //CREATE END
  


  

  //DELETE START
  deleteQuiz(questionID: string): Observable<Quiz> {
    const url = `${this.quizzesUrl}/${questionID}`;
    return this.http.delete<Quiz>(url, this.httpOptions);
  }
  //DELETE END


}
