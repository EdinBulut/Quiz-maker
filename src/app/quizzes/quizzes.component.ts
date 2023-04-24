import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, delay, filter, from, map, shareReplay, take, tap, toArray } from 'rxjs';
import { Quiz } from './models/quiz-model';
import { QuizzesService } from './services/quizzes.service';
import { skeletonLoaderData } from '../shared/constants/skeleton.constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogVariables } from '../shared/models/dialog-variables.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopScrollStrategy } from '@angular/cdk/overlay';


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
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }



  ngOnInit(): void {
    this.getQuizzes()
  }



  getQuizzes() {
    this.quizzes$ = this.quizzesService.getQuizzes()
      .pipe(
        delay(500),
        tap(quizes => console.log(quizes)),
        shareReplay(1)
      )
  }



  deleteQuiz(quiz: Quiz) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '100%',
      maxWidth: '456px',
      minHeight: '276px',
      panelClass: 'bottom-to-top',
      data: this.confirmDeleteQuizData(quiz.name),
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) this.onDeleteQuizConfirmed(quiz._id)
    })
  }



  onDeleteQuizConfirmed(quizID: string) {
    this.isProcessing = true
    this.quizzesService.deleteQuiz(quizID).subscribe(
      quiz => {
        this.quizzes$ = this.quizzes$.pipe(
          map(quizzes => quizzes.filter(q => q._id !== quiz._id)),
          tap(() => {
            this.isProcessing = false
            this.cdRef.detectChanges()
            const message = 'Quiz successfully deleted'
            this.snackBar.open(message, '', {
              horizontalPosition: 'center',
              duration: 3000
            });
          })
        )
      },
      err => console.log(err)
      )
  }
  


  confirmDeleteQuizData(quizName: string) {
    const messageTxt = `Are you sure you want to delete quiz <strong>${quizName}</strong>?`
    const dialogVariables: DialogVariables = {
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
    return dialogVariables
  }



}
