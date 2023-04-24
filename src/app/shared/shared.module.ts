import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

const materialModules = [
  MatProgressBarModule,
  MatRippleModule,
  MatCardModule,
  MatDialogModule,
]

@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    materialModules
  ],

  exports: [
    CommonModule,
    materialModules,
    ConfirmDialogComponent
  ]
})

export class SharedModule { }
