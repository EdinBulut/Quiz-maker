import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { FilterByKeyPipe } from './pipes/filter-by-key.pipe';


const materialModules = [
  MatProgressBarModule,
  MatRippleModule,
  MatCardModule,
  MatDialogModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    HighlightTextPipe,
    FilterByKeyPipe,
  ],
  imports: [
    materialModules,
    CommonModule,
    FormsModule
  ],

  exports: [
    materialModules,
    CommonModule,
    FormsModule,
    ConfirmDialogComponent,
    HighlightTextPipe,
    FilterByKeyPipe,
  ]
})

export class SharedModule { }
