import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './shared/API/questionAPI/question-api.service';
import { Observable, tap } from 'rxjs';
import { Question } from './dashboard/questions/models/question-model';
import { } from 'rxjs/operators'
import { QuizAPIService } from './shared/API/quizAPI/quiz-api.service';
import { Quiz } from './dashboard/quizzes/models/quiz-model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Quiz-maker';
  questions$!: Observable<Question[]>
  quizes$!: Observable<Quiz[]>
  constructor(
    private questionsService: QuestionsService,
    private quizAPI: QuizAPIService
    ) { }


  ngOnInit(): void {
    this.questions$ = this.questionsService.getQuestions()
    .pipe(
      tap(data => console.log('questions', data))
    )
    this.quizes$ = this.quizAPI.getQuizzes()
    .pipe(
      tap(quizes => console.log(quizes))
    )
    
    this.quizAPI.searchQuizzes('TEST')
    .subscribe(
      {next: (data) => console.log('searched quizzes', data), 
      error: (err) => console.error(err)}
      )
  }

  createQuiz() {
    this.quizAPI.createQuiz({name: 'Novi kviz', questionIDs: ['6441af1dfa180794e978e123']})
    .subscribe(
      {next: (data) => console.log('created', data), 
      error: (err) => console.error(err)}
      )
  }

  updateQuiz() {
    this.quizAPI.updateQuiz('6442651ad71f4a3dc492faf0', { name: 'Dzoni', removeQuestions: ['6444480d537f789639099262'], addQuestions: ['6442af1f537f789639099254', '6444514f537f789639099269']})
    .subscribe({next: (data) => console.log('updated', data), 
      error: (err) => console.error(err),
      complete: () => console.log('Quiz update completed')
    })
  }

  insertQuestionIntoQuiz(){
    this.quizAPI.insertQuestionIntoQuiz({quizID: '6442651ad71f4a3dc492faf0', questionID: '6444480d537f789639099262'})
    .subscribe(
      {next: (data) => console.log('added question', data), 
      error: (err) => console.error(err)}
    )
  }

  removeQuestionFromQuiz(){
    this.quizAPI.removeQuestionFromQuiz({quizID: '6442651ad71f4a3dc492faf0', questionIDs: ['6444480d537f789639099262', '1233']})
    .subscribe(
      {next: (data) => console.log('removed question', data), 
      error: (err) => console.error(err)}
      )
  }

  deleteQuestion() {
    this.questionsService.deleteQuestion('644456ad537d789639099279').subscribe({
      next: (data) => console.log('removed question', data), 
      error: (err) => console.error(err)
    })
  }


  deleteQuiz() {
    this.quizAPI.deleteQuiz('64447f7fa3bd8d11efa65eed').subscribe({
      next: (data) => console.log('removed question', data), 
      error: (err) => console.error(err)
    })
  }

}
