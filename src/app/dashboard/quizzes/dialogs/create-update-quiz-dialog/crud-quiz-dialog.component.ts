import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quiz } from '../../models/quiz-model';
import { Crud } from 'src/app/shared/models/crud.enum';

@Component({
  selector: 'app-create-update-quiz-dialog',
  templateUrl: './crud-quiz-dialog.component.html',
  styleUrls: ['./crud-quiz-dialog.component.scss']
})


export class CrudQuizDialogComponent implements OnInit {

  isClosed = false
  CRUD = Crud
  quiz: Quiz = {
    name: '',
    questions: []
  }



  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: {CRUD: Crud, quiz?: Quiz},
    private matDialogRef: MatDialogRef<CrudQuizDialogComponent>
  ) { }



  ngOnInit(): void {
    this.initialSettings()
  }
  
  
  
  initialSettings() {
    if (this.injectedData.CRUD === this.CRUD.UPDATE) {
      this.quiz = Object.assign({}, this.injectedData.quiz)
      console.log(this.quiz)
    }
  }



  closeDialog(isConfirmed?: boolean) {
    this.isClosed = true
    this.matDialogRef.close(isConfirmed)
  }



}
