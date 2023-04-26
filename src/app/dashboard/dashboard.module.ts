import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { TasksComponent } from './questions/tasks.component';
import { CrudQuizDialogComponent } from './quizzes/dialogs/create-update-quiz-dialog/crud-quiz-dialog.component';
import { CrudTaskDialogComponent } from './questions/dialogs/crud-task-dialog/crud-task-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    QuizzesComponent,
    TasksComponent,
    CrudQuizDialogComponent,
    CrudTaskDialogComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
