import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { HighlightTextPipe } from './shared/pipes/highlight-text.pipe';
import { FilterByKeyPipe } from './shared/pipes/filter-by-key.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    HighlightTextPipe,
    FilterByKeyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
