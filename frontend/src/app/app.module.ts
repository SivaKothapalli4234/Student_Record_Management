import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentService } from './student.service';

@NgModule({
  declarations: [
    AppComponent // Main app component
  ],
  imports: [
    BrowserModule, // Required for running in browser
    HttpClientModule, // Required for HTTP requests to backend
    FormsModule // Required for form handling and ngModel
  ],
  providers: [
    StudentService // Service for API calls
  ],
  bootstrap: [AppComponent] // Component to start the app
})
export class AppModule { }