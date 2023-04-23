import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'quizzes',
    loadChildren: () => import('./quizzes/quizzes.module').then(m => m.QuizzesModule)
  },
  {
    path: 'questions',
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
