import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, delay, filter, from, map, shareReplay, take, tap, toArray } from 'rxjs';
import { Quiz } from './models/quiz-model';
import { QuizzesService } from '../../shared/API/quizAPI/quiz-api.service';
import { skeletonLoaderData } from '../../shared/constants/skeleton.constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogVariables } from '../../shared/models/dialog-variables.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { CrudQuizDialogComponent } from './dialogs/create-update-quiz-dialog/crud-quiz-dialog.component';
import { Crud } from 'src/app/shared/models/crud.enum';

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
  searchValue = ''

  constructor(
    private quizzesService: QuizzesService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.getQuizzes()
  }



  getQuizzes() {
    this.quizzes$ = this.quizzesService.getQuizzes()
      .pipe(
        delay(300),
        map(quizzes => quizzes.sort((q1, q2) => q1.name < q2.name ? -1 : 1)),
        tap(quizes => console.log(quizes)),
        shareReplay(1)
      )
  }



  createQuiz() {
    const dialogRef = this.dialog.open(CrudQuizDialogComponent, this.crudDialogSettings(Crud.CREATE))
  }



  crudDialogSettings(CRUD: Crud, quiz?: Quiz) {
    const settings = {
      width: '100%',
      maxWidth: '456px',
      minHeight: '276px',
      panelClass: 'bottom-to-top',
      data: { CRUD, quiz },
      scrollStrategy: new NoopScrollStrategy()
    }
    return settings
  }



  updateQuiz(quiz: Quiz) {
    const dialogRef = this.dialog.open(CrudQuizDialogComponent, this.crudDialogSettings(Crud.UPDATE, quiz))
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
      if (confirmed && quiz._id) this.onDeleteQuizConfirmed(quiz._id)
    })
  }



  deleteQuizSettings(quizName: string) {
    const settings = {
      width: '100%',
      maxWidth: '456px',
      minHeight: '276px',
      panelClass: 'bottom-to-top',
      data: this.confirmDeleteQuizData(quizName),
      scrollStrategy: new NoopScrollStrategy()
    }
    return settings
  }



  onDeleteQuizConfirmed(quizID: string) {
    this.isProcessing = true
    this.quizzesService.deleteQuiz(quizID).subscribe({
      next: quiz => {
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
      error: err => console.log(err)
    })
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
