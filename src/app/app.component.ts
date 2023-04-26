import { Component, OnInit } from '@angular/core';
import { TaskAPIService } from './shared/API/taskAPI/task-api.service';
import { Observable, tap } from 'rxjs';
import { Task } from './dashboard/tasks/models/task-model';
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
  questions$!: Observable<Task[]>
  quizes$!: Observable<Quiz[]>
  constructor(
    private questionsService: TaskAPIService,
    private quizAPI: QuizAPIService
    ) { }


  ngOnInit(): void {
    this.questions$ = this.questionsService.getTasks()
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
    this.quizAPI.updateQuiz('6442651ad71f4a3dc492faf0', { name: 'Dzoni', removeTasks: ['6444480d537f789639099262'], addTasks: ['6442af1f537f789639099254', '6444514f537f789639099269']})
    .subscribe({next: (data) => console.log('updated', data), 
      error: (err) => console.error(err),
      complete: () => console.log('Quiz update completed')
    })
  }

  insertTaskIntoQuiz(){
    this.quizAPI.insertTaskIntoQuiz({quizID: '6442651ad71f4a3dc492faf0', questionID: '6444480d537f789639099262'})
    .subscribe(
      {next: (data) => console.log('added question', data), 
      error: (err) => console.error(err)}
    )
  }

  removeTaskFromQuiz(){
    this.quizAPI.removeTaskFromQuiz({quizID: '6442651ad71f4a3dc492faf0', questionIDs: ['6444480d537f789639099262', '1233']})
    .subscribe(
      {next: (data) => console.log('removed question', data), 
      error: (err) => console.error(err)}
      )
  }

  deleteTask() {
    this.questionsService.deleteTask('644456ad537d789639099279').subscribe({
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
