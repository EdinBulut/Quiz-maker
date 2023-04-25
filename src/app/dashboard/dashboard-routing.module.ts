import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'quizzes', pathMatch: 'full'},
  {
    path: 'quizzes',
    loadChildren: () => import('./quizzes/quizzes.module').then(m => m.QuizzesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
