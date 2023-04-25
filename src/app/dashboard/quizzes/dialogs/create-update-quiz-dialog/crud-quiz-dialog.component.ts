import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quiz } from '../../models/quiz-model';
import { Crud } from 'src/app/shared/models/crud.enum';
import { QuizAPIService } from 'src/app/shared/API/quizAPI/quiz-api.service';

@Component({
  selector: 'app-create-update-quiz-dialog',
  templateUrl: './crud-quiz-dialog.component.html',
  styleUrls: ['./crud-quiz-dialog.component.scss']
})


export class CrudQuizDialogComponent implements OnInit {

  isClosed = false
  isSearchInFocus = false
  isProcessing = false
  CRUD = Crud
  quiz: Quiz = {
    name: '',
    questions: []
  }




  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: {CRUD: Crud, quiz?: Quiz},
    private matDialogRef: MatDialogRef<CrudQuizDialogComponent>,
    private quizAPI: QuizAPIService
  ) { }



  ngOnInit(): void {
    this.initialSettings()
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
    this.quizAPI.createQuiz({name: this.quiz.name.trim(), questionIDs: qIDs}).subscribe({
      next: quiz => {
        console.log(quiz)
        this.closeDialogWithData(quiz)
      },
      error: err => console.error(err)
    })
  }


}
