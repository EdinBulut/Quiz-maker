import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuestionsComponent } from './questions/questions.component';
import { CreateUpdateQuizDialogComponent } from './quizzes/dialogs/create-update-quiz-dialog/create-update-quiz-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    QuizzesComponent,
    QuestionsComponent,
    CreateUpdateQuizDialogComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
