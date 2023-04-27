import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Quiz } from 'src/app/dashboard/quizzes/models/quiz-model';
import { Task } from 'src/app/dashboard/tasks/models/task-model';
import { QuizAPIService } from 'src/app/shared/API/quizAPI/quiz-api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quiz!: Quiz
  isPlaying = false
  currentIndex = 0
  private unsubscriber$: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private quizAPI: QuizAPIService
  ) { }



  ngOnInit(): void {
    this.getRouteParams()
  }



  getRouteParams() {
    const quizID = this.activatedRoute.snapshot.paramMap.get('quizID')
    if (quizID) this.getQuizData(quizID)
  }



  getQuizData(quizID: string) {
    this.quizAPI.getQuiz(quizID).pipe(
      takeUntil(this.unsubscriber$),
    )
      .subscribe({
        next: quiz => {
          if (!quiz._id) return
          quiz.questions = quiz.questions.map(q => {
            return Object.assign({ isAnswerVisible: false }, q)
          })
          this.quiz = quiz
        },
        error: err => console.error(err)
      })
  }



  playQuiz() {
    this.isPlaying = true
  }



  onPrevBtn() {
    if (this.isPrevDisabled()) return
    this.currentIndex--
  }



  onNextBtn() {
    if (this.isNextDisabled()) return
    this.currentIndex++
  }



  isNextDisabled() {
    return (this.currentIndex >= this.quiz.questions.length - 1)
  }



  isPrevDisabled() {
    return this.currentIndex <= 0
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next()
    this.unsubscriber$.unsubscribe()
  }


}
