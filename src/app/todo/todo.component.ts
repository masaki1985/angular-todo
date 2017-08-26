import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  TodoList = [
    { todo : '宿題', isCompleted: false, isEdit: false },
  ]

  selectedList = 'daily';
  selected = {
    daily: true,
    weekly: false,
    monthly: false,
    noLimit: false
  }

  constructor(private router: Router) { }

  ngOnInit() {　}

  gotoDaily() {
    this.router.navigateByUrl('daily')
  }

  gotoWeekly() {
    this.router.navigateByUrl('weekly')
  }

  gotoMonthly() {
    this.router.navigateByUrl('monthly')
  }

  gotoNoLimit() {
    this.router.navigateByUrl('noLimit')
  }

  goto(target) {
    this.router.navigateByUrl(target);
  }

  select(target) {
    this.selectedList = target;
    this.selected['daily'] = false;
    this.selected['weekly'] = false;
    this.selected['monthly'] = false;
    this.selected['noLimit'] = false;
    this.selected[target] = true;
  }

  clear() {
    if (!confirm('削除しますか?')) { return; }
    localStorage.clear();
  }
}


