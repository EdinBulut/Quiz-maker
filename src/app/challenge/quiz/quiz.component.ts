import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/dashboard/quizzes/models/quiz-model';
import { QuizAPIService } from 'src/app/shared/API/quizAPI/quiz-api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizID!: string
  quiz!: Quiz

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


    this.activatedRoute.firstChild?.params?.subscribe(params => {
      console.log(params)
      console.log(params['taskID'])
    })
  }



  getQuizData(quizID: string) {
    console.log('quizID', quizID)
    this.quizID = quizID
    this.quizAPI.getQuiz(quizID).subscribe({
      next: quiz => {
        if (!quiz._id) return
        this.quiz = quiz
        console.log(quiz)
      },
      error: err => console.error(err)
    })
  }


  playQuiz() {

  }



}
