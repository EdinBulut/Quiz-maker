import { Component, OnInit } from '@angular/core';
import { Observable, debounceTime, delay, tap } from 'rxjs';
import { Quiz } from './models/quiz-model';
import { QuizzesService } from './services/quizzes.service';
import { skeletonLoaderData } from '../shared/constants/skeleton.constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/components/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
  isProcessing = false
  quizzes$!: Observable<Quiz[]>
  skeletonLoaderData = skeletonLoaderData
  isSearchInFocus = false

  constructor(
    private quizzesService: QuizzesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getQuizzes()
  }

  getQuizzes() {
    this.quizzes$ = this.quizzesService.getQuizzes()
      .pipe(
        delay(1000),
        tap(quizes => console.log(quizes))
      )
  }


  deleteQuiz(quizForRemove: Quiz) {
    console.log('remove me')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '100%',
      maxWidth: '456px',
      minHeight: '276px',
      panelClass: 'bottom-to-top',
      data: this.confirmDeleteQuizData(quizForRemove)
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.isProcessing = true
      }
    })
  }


  confirmDeleteQuizData(quizForRemove: Quiz) {
    const messageTxt = `Are you sure you want to delete quiz <strong>${quizForRemove.name}</strong>?`
    const dialogVariables =  {
        title: 'Delete quiz',
        message: {
          text: messageTxt,
          isCentered: true
        },
        cancelBtn: {
          text: 'No'
        },
        confirmBtn: {
          text: 'Yes'
        },
    }
    console.log(dialogVariables)
    return dialogVariables
  }



}
