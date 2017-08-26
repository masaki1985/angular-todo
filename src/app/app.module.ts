import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { LocalstorageService } from './todo/shared/localstorage.service';
import { ListComponent } from './todo/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ListComponent
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
