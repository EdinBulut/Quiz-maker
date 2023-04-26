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

  initialQstnsIDs: string[] = []
  addedQstnsIDs: string[] = []
  removedQstnsIDs: string[] = []


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
      this.quiz.questions = this.quiz.questions.map(x => JSON.parse(JSON.stringify(x)))

      this.initialQstnsIDs = [...this.quiz.questions].map(q => q._id)
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



  updateQuiz() {
    if (!this.quiz._id) return
    this.addedQstnsIDs = this.addedQstnsIDs.filter(qID => !this.initialQstnsIDs.some(x => x === qID))
    console.log('added', this.addedQstnsIDs)
    console.log('init', this.initialQstnsIDs)

    this.quizAPI.updateQuiz(this.quiz._id, { name: this.quiz.name.trim(), addQuestions: this.addedQstnsIDs, removeQuestions: this.removedQstnsIDs }).subscribe({
      next: quiz => {
        console.log(quiz)
        this.closeDialogWithData(quiz)
      },
      error: err => console.error(err)
    })
  }



  isSaveEnabled() {
    const initialName = this.injectedData.quiz?.name?.trim()
    const newName = this.quiz.name.trim()
    if (!newName) return false
    if (!this.quiz.questions.length) return false

    const isNameChanged = initialName !== newName
    if (isNameChanged) return true
    if (!!this.removedQstnsIDs.length) return true
    const addedQstns = this.addedQstnsIDs.filter(qID => !this.initialQstnsIDs.some(x => x === qID))
    return !!addedQstns.length
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



  addQuestionIntoQuiz(addedQ: Question) {
    this.quiz.questions.push(addedQ)
    this.addedQstnsIDs.push(addedQ._id)
    this.removedQstnsIDs = this.removedQstnsIDs.filter(id => id !== addedQ._id)
  }



  removeQuestionFromQuiz(qID: string) {
    this.quiz.questions = this.quiz.questions.filter(q => q._id !== qID)
    this.addedQstnsIDs = this.addedQstnsIDs.filter(id => id !== qID)
    if (this.initialQstnsIDs.some(x => x === qID)) this.removedQstnsIDs.push(qID)
  }

  

}
