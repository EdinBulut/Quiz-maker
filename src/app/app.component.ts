import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './services/questions.service';
import { Observable, tap } from 'rxjs';
import { Question } from './models/question-model';
import { } from 'rxjs/operators'
import { QuizzesService } from './services/quizzes.service';
import { Quiz } from './models/quiz-model';


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
    private quizzesService: QuizzesService
    ) { }


  ngOnInit(): void {
    this.questions$ = this.questionsService.getQuestions()
    .pipe(
      tap(data => console.log('questions', data))
    )
    this.quizes$ = this.quizzesService.getQuizzes()
    .pipe(
      tap(quizes => console.log(quizes))
    )
    
    this.quizzesService.searchQuizzes('TEST')
    .subscribe(
      {next: (data) => console.log('searched quizzes', data), 
      error: (err) => console.error(err)}
      )
  }

  createQuiz() {
    this.quizzesService.createQuiz({name: 'Novi kviz', questionIDs: ['6441af1dfa180794e978e123']})
    .subscribe(
      {next: (data) => console.log('created', data), 
      error: (err) => console.error(err)}
      )
  }

  insertQuestionIntoQuiz(){
    this.quizzesService.insertQuestionIntoQuiz({quizID: '6442651ad71f4a3dc492faf0', questionID: '6441af1dfa180794e978e123'})
    .subscribe(
      {next: (data) => console.log('added question', data), 
      error: (err) => console.error(err)}
      )
  }

  removeQuestionFromQuiz(){
    this.quizzesService.removeQuestionFromQuiz({quizID: '6442651ad71f4a3dc492faf0', questionIDs: ['6441af1dfa180794e978e123', '123456', 'a1a2a3']})
    .subscribe(
      {next: (data) => console.log('removed question', data), 
      error: (err) => console.error(err)}
      )
  }

}
