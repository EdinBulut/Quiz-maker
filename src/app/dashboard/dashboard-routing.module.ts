import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuestionsComponent } from './questions/questions.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
  children: [
    {
      path: '', redirectTo: 'quizzes', pathMatch: 'full',
    },
    {
      path: 'quizzes', component: QuizzesComponent
    },
    {
      path: 'questions', component: QuestionsComponent
    },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
