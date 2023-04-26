import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChallengeComponent } from './challenge.component';
import { QuizComponent } from './quiz/quiz.component';
import { TaskComponent } from './task/task.component';


@NgModule({
  declarations: [
    ChallengeComponent,
    QuizComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    SharedModule
  ]
})
export class ChallengeModule { }
