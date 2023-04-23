import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Quiz } from './models/quiz-model';
import { QuizzesService } from './services/quizzes.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
  quizzes$!: Observable<Quiz[]>

  constructor(
    private quizzesService: QuizzesService
  ) { }

  ngOnInit(): void {
    this.getQuizzes()
  }

  getQuizzes() {
    this.quizzes$ = this.quizzesService.getQuizzes()
    .pipe(
      tap(quizes => console.log(quizes))
    )
  }

}
