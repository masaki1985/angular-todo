import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

  tagList = [];
  todoList = [];

  constructor() {
    this.load();
  }

  load() {
    this.tagList = JSON.parse(localStorage.getItem('tag'));
    if (!this.tagList) { return; }
    for (let i = 0; i < this.tagList.length ; i++) {
      this.todoList[i] = JSON.parse(localStorage.getItem(i.toString()));
    }
  }

  set(target, list) {
    localStorage.setItem(target, JSON.stringify(list));
    this.load();
  }

  get(target) {
    return this.todoList[target];
  }

  getTag() {
    return this.tagList;
  }

  remove(target) {
    localStorage.removeItem(target);
  }

}
