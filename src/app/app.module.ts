import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { DailyComponent } from './todo/daily/daily.component';
import { WeeklyComponent } from './todo/weekly/weekly.component';
import { LocalstorageService } from './todo/shared/localstorage.service';
import { MonthlyComponent } from './todo/monthly/monthly.component';
import { NoLimitComponent } from './todo/no-limit/no-limit.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    DailyComponent,
    WeeklyComponent,
    MonthlyComponent,
    NoLimitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    LocalstorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
