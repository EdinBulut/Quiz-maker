import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionAPIService } from 'src/app/shared/API/questionAPI/question-api.service';
import { Crud } from 'src/app/shared/models/crud.enum';
import { Question } from '../../models/question-model';

@Component({
  selector: 'app-crud-question-dialog',
  templateUrl: './crud-question-dialog.component.html',
  styleUrls: ['./crud-question-dialog.component.scss']
})
export class CrudQuestionDialogComponent implements OnInit {
  isClosed = false
  isProcessing= false
  isQstnInFocus = false
  isAnswerInFocus= false


  CRUD = Crud 
  task: Question = {
    question: '',
    answer: ''
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: { CRUD: Crud, task?: Question },
    private matDialogRef: MatDialogRef<CrudQuestionDialogComponent>,
    private taskAPI: QuestionAPIService,
  ) { }



  ngOnInit(): void {
    this.initialSettings()
  }



  initialSettings() {
    if (this.injectedData.CRUD === this.CRUD.UPDATE) {
      this.task = Object.assign({}, this.injectedData.task)
    }
  }



  closeDialog(isConfirmed?: boolean) {
    this.isClosed = true
    this.matDialogRef.close(isConfirmed)
  }



  closeDialogWithData(createdTask: Question) {
    this.isClosed = true
    this.matDialogRef.close(createdTask)
  }



  isSaveEnabled() {
    if (this.isProcessing) return false
    const {question, answer} = this.task
    const initialQuestion = this.injectedData.task?.question?.trim()
    if (!question) return
    const isNameChanged = initialQuestion !== question
    if (isNameChanged) return true
    const initialAnswer = this.injectedData.task?.question?.trim()
    if (!answer) return
    const isAnswerChanged = initialAnswer !== answer
    return isAnswerChanged
  }



  createTask() {
    this.taskAPI.createQuestion({ question: this.task.question, answer: this.task.answer}).subscribe({
      next: task => {
        console.log(task)
        this.closeDialogWithData(task)
      },
      error: err => console.error(err)
    })
  }


  updateTask() {
    if (!this.task._id || !this.isSaveEnabled()) return

    this.taskAPI.updateTask(this.task._id, { question: this.task.question, answer: this.task.answer}).subscribe({
      next: task => {
        console.log(task)
        this.closeDialogWithData(task)
      },
      error: err => console.error(err)
    })
  }


}
