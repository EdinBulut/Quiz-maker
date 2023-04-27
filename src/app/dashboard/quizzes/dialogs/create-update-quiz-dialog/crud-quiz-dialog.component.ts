import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Quiz } from '../../models/quiz-model';
import { Crud } from 'src/app/shared/models/crud.enum';
import { QuizAPIService } from 'src/app/shared/API/quizAPI/quiz-api.service';
import { Observable, debounceTime, fromEvent, map, tap } from 'rxjs';
import { TaskAPIService } from 'src/app/shared/API/taskAPI/task-api.service';
import { Task } from 'src/app/dashboard/tasks/models/task-model';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { CrudTaskDialogComponent } from 'src/app/dashboard/tasks/dialogs/crud-task-dialog/crud-task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  @ViewChild('searchTask') searchTask!: ElementRef<HTMLInputElement>;
  searchTasksInput = ''
  questions$!: Observable<Task[]>
  showDropdown = true


  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: { CRUD: Crud, quiz?: Quiz },
    private matDialogRef: MatDialogRef<CrudQuizDialogComponent>,
    private quizAPI: QuizAPIService,
    private questionAPI: TaskAPIService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }



  ngOnInit(): void {
    this.initialSettings()
    this.searchTasksTrigger()
  }



  initialSettings() {
    if (this.injectedData.CRUD === this.CRUD.UPDATE) {
      this.quiz = Object.assign({}, this.injectedData.quiz)
      this.quiz.questions = this.quiz.questions.map(x => JSON.parse(JSON.stringify(x)))

      this.initialQstnsIDs = [...this.quiz.questions].flatMap(q => (q?._id as string))
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



  createQuiz() {
    const qIDs: string[] = [...this.quiz.questions].map(q => (q?._id as string))
    this.quizAPI.createQuiz({ name: this.quiz.name.trim(), questionIDs: qIDs }).subscribe({
      next: quiz => {
        this.closeDialogWithData(quiz)
      },
      error: err => console.error(err)
    })
  }



  updateQuiz() {
    if (!this.quiz._id) return
    this.addedQstnsIDs = this.addedQstnsIDs.filter(qID => !this.initialQstnsIDs.some(x => x === qID))

    this.quizAPI.updateQuiz(this.quiz._id, { name: this.quiz.name.trim(), addTasks: this.addedQstnsIDs, removeTasks: this.removedQstnsIDs }).subscribe({
      next: quiz => {
        this.closeDialogWithData(quiz)
      },
      error: err => console.error(err)
    })
  }



  isSaveEnabled() {
    if (this.isProcessing) return false
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



  searchTasksTrigger() {
    setTimeout(() => {
      fromEvent(this.searchTask.nativeElement, 'keyup').pipe(
        map((event: any) => event.target.value),
        debounceTime(600),
        tap(value => this.searchExistingTasks(value))
      ).subscribe()
    }, 0)
  }



  searchExistingTasks(searchValue: string) {
    this.questions$ = this.questionAPI.searchTasks(searchValue).pipe(
      map(questions => questions.filter(q => !this.quiz.questions.some(x => x._id === q._id))),
      tap(data => console.log(data))
    )
  }
  


  checkIsTaskAdded(questionID?: string) {
    if (!questionID) return false
    return !this.quiz.questions.some(q => q._id === questionID)
  }



  addTaskIntoQuiz(addedQ: Task) {
    this.quiz.questions.push(addedQ)
    this.addedQstnsIDs.push((addedQ?._id as string))
    this.removedQstnsIDs = this.removedQstnsIDs.filter(id => id !== addedQ._id)
  }



  removeTaskFromQuiz(qID?: string) {
    if (!qID) return
    this.quiz.questions = this.quiz.questions.filter(q => q._id !== qID)
    this.addedQstnsIDs = this.addedQstnsIDs.filter(id => id !== qID)
    if (this.initialQstnsIDs.some(x => x === qID)) this.removedQstnsIDs.push(qID)
  }



  createTask() {
    const dialogRef = this.dialog.open(CrudTaskDialogComponent, this.createUpdateTaskDialogSettings(Crud.CREATE))
    dialogRef.afterClosed().subscribe({
      next: (createdTask: Task) => {
        if (!createdTask) return
        this.quiz.questions.unshift(createdTask)
        this.addedQstnsIDs.push((createdTask._id as string))
        const message = 'Task successfully created'
        this.snackBarTrigger(message)
      },
      error: err => console.error(err)
    })
  }



  createUpdateTaskDialogSettings(CRUD: Crud, task?: Task) { 
    // will be moved into dialog-settings service later
    const settings = {
      width: '100%',
      maxWidth: '456px',
      minHeight: '276px',
      panelClass: 'bottom-to-top',
      data: { CRUD, task },
      scrollStrategy: new NoopScrollStrategy()
    }
    return settings
  }

  

  snackBarTrigger(message: string) { 
    // will be moved into snackbar service later
    this.snackBar.open(message, '', {
      horizontalPosition: 'center',
      duration: 3000
    });
  }


}
