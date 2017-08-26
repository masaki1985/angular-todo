import { NoLimitComponent } from './todo/no-limit/no-limit.component';
import { MonthlyComponent } from './todo/monthly/monthly.component';
import { DailyComponent } from './todo/daily/daily.component';
import { WeeklyComponent } from './todo/weekly/weekly.component';
import { TodoComponent } from './todo/todo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: TodoComponent
    }
    // {
    //     path: 'daily',
    //     component: DailyComponent
    // },
    // {
    //     path: 'weekly',
    //     component: WeeklyComponent
    // },
    // {
    //     path: 'monthly',
    //     component: MonthlyComponent
    // },
    // {
    //     path: 'noLimit',
    //     component: NoLimitComponent
    // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
