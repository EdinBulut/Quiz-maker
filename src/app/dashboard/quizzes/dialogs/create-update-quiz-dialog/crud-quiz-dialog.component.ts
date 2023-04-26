import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quiz } from '../../models/quiz-model';
import { Crud } from 'src/app/shared/models/crud.enum';
import { QuizAPIService } from 'src/app/shared/API/quizAPI/quiz-api.service';
import { Observable, debounceTime, fromEvent, map, tap } from 'rxjs';
import { QuestionAPIService } from 'src/app/shared/API/questionAPI/question-api.service';
import { Question } from 'src/app/dashboard/questions/models/question-model';

@Component({
  selector: 'app-create-update-quiz-dialog',
  templateUrl: './crud-quiz-dialog.component.html',
  styleUrls: ['./crud-quiz-dialog.component.scss']
})


export class CrudQuizDialogComponent implements OnInit {

  isClosed = false
  isSearchInFocus = false
  isTextareaInFocus = false
  isProcessing = false
  CRUD = Crud
  quiz: Quiz = {
    name: '',
    questions: []
  }


  @ViewChild('searchQuestion') searchQuestion!: ElementRef<HTMLInputElement>;
  searchQuestionsInput = ''
  questions$!: Observable<Question[]>
  showDropdown = true


  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: { CRUD: Crud, quiz?: Quiz },
    private matDialogRef: MatDialogRef<CrudQuizDialogComponent>,
    private quizAPI: QuizAPIService,
    private questionAPI: QuestionAPIService,
  ) { }



  ngOnInit(): void {
    this.initialSettings()
    this.searchQuestionsTrigger()
  }



  initialSettings() {
    if (this.injectedData.CRUD === this.CRUD.UPDATE) {
      this.quiz = Object.assign({}, this.injectedData.quiz)
    }
  }



  closeDialog(isConfirmed?: boolean) {
    this.isClosed = true
    this.matDialogRef.close(isConfirmed)
  }



  closeDialogWithData(createdQuiz: Quiz) {
    this.isClosed = true
    this.matDialogRef.close(createdQuiz)
  }



  checkIsCreateDisabled() {
    return this.isProcessing || !this.quiz.name.trim()
  }



  createQuiz() {
    const qIDs: string[] = [...this.quiz.questions].map(q => q._id)
    this.quizAPI.createQuiz({ name: this.quiz.name.trim(), questionIDs: qIDs }).subscribe({
      next: quiz => {
        console.log(quiz)
        this.closeDialogWithData(quiz)
      },
      error: err => console.error(err)
    })
  }



  searchQuestionsTrigger() {
    setTimeout(() => {
      fromEvent(this.searchQuestion.nativeElement, 'keyup').pipe(
        map((event: any) => event.target.value),
        debounceTime(600),
        tap(value => this.searchExistingQuestions(value))
      ).subscribe()
    }, 0)
  }



  searchExistingQuestions(searchValue: string) {
    this.questions$ = this.questionAPI.searchQuestions(searchValue).pipe(
      map(questions => questions.filter(q => !this.quiz.questions.some(x => x._id === q._id))),
      tap(data => console.log(data))
    )
  }
  


  checkIsQuestionAdded(quizID: string) {
    return !this.quiz.questions.some(q => q._id === quizID)
  }



  addQuestionIntoQuiz(question: Question) {
    this.quiz.questions.push(question)
  }

  

}
