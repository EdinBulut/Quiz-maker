import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './services/questions.service';
import { Observable, tap } from 'rxjs';
import { Question } from './models/question-model';
import { } from 'rxjs/operators'
import { QuizzesService } from './services/quizzes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Quiz-maker';
  questions$!: Observable<Question[]>
  constructor(
    private questionsService: QuestionsService,
    private quizzesService: QuizzesService
    ) { }


  ngOnInit(): void {
    this.questions$ = this.questionsService.getQuestions()
    .pipe(
      tap(data => console.log('questions', data))
    )
    this.quizzesService.getQuizzes().subscribe(data => console.log('all quizzes', data))
    this.quizzesService.searchQuizzes('TEST').subscribe(data => console.log('searched quizzes', data))
  }

}
