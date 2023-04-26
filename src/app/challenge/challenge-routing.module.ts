import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeComponent } from './challenge.component';
import { QuizComponent } from './quiz/quiz.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [

  { path: '', component: ChallengeComponent,
    children: [
      {
        path: ':quizID', component: QuizComponent,
        children: [
          {
            path: ':taskID', component: TaskComponent,
          }
        ]
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
