import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatRippleModule} from '@angular/material/core';


@NgModule({
  declarations: [
  ],
  exports: [
    MatProgressBarModule,
    MatRippleModule
  ]
})

export class SharedModule { }
