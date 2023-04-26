import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { TasksComponent } from './questions/tasks.component';
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
      path: 'questions', component: TasksComponent
    },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
