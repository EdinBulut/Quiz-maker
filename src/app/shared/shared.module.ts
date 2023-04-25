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
import { HeaderComponent } from './components/header/header.component';
import { NavigationHorizontalComponent } from './components/navigation-horizontal/navigation-horizontal.component';
import { RouterModule } from '@angular/router';
import {TextFieldModule} from '@angular/cdk/text-field';


const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  TextFieldModule,
]

const materialModules = [
  MatProgressBarModule,
  MatRippleModule,
  MatCardModule,
  MatDialogModule,
  MatSnackBarModule
]


const components = [
  HeaderComponent,
  ConfirmDialogComponent,
  NavigationHorizontalComponent,
]


const pipes = [
  HighlightTextPipe,
  FilterByKeyPipe,
]


@NgModule({
  declarations: [
    components,
    pipes,
  ],
  imports: [
    modules,
    materialModules,
  ],

  exports: [
    modules,
    materialModules,
    components,
    pipes
  ]
})

export class SharedModule { }
