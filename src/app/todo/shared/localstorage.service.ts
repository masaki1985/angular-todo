import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

  dailyList;
  weeklyList;
  monthlyList;
  noLimitList;
  List = 'List';

  constructor() {
    this.load();
  }

  load() {
    this.dailyList = JSON.parse(localStorage.getItem('daily'));
    this.weeklyList = JSON.parse(localStorage.getItem('weekly'));
    this.monthlyList = JSON.parse(localStorage.getItem('monthly'));
    this.noLimitList = JSON.parse(localStorage.getItem('noLimit'));
  }

  set(target, list) {
    localStorage.setItem(target, JSON.stringify(list));
    this.load();
  }

  get(target) {
    return this[target + this.List]
  }

  remove(target) {
    localStorage.removeItem(target);
  }

}
