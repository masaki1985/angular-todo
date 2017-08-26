import { LocalstorageService } from '../shared/localstorage.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {

  @ViewChildren('editTodo') editTodo: QueryList<ElementRef>;
  @ViewChildren('addTodo') addTodo: QueryList<ElementRef>;

  todoList;
  target = 'monthly';
  isEnterPress = false;
  isHidden = false;
  enterkeyCode = 13;

  constructor(
    private router: Router,
    private localstorageService: LocalstorageService
  ) { }

  ngOnInit() {
    this.todoList = this.localstorageService.get(this.target);
  }

  add(element) {
    if (!element.value) { return; }
    const data = { todo: element.value, isCompleted: false, isEdit: false}
    if (this.todoList) {
      this.todoList.push(data);
    } else {
      this.todoList = [data];
    }
    this.localstorageService.set(this.target, this.todoList)
    element.value = '';
  }

  addByEnter(element, event) {
    if (event.keyCode !== this.enterkeyCode) { return; }
    this.add(element);
  }

  addByBlur(element, isSwitch?) {
    if (isSwitch) { this.switch(); }
    this.add(element);
  }

  doCheck(index) {
    if (this.todoList[index].isCompleted) {
      this.todoList[index].isCompleted = false;
    } else {
      this.todoList[index].isCompleted = true;
    }
    this.localstorageService.set(this.target, this.todoList);
  }

  delete(index) {
    if (!this.todoList[index].isCompleted) {
      alert('完了していません');
      return;
    }
    this.todoList.splice(index, 1);
    this.localstorageService.set(this.target, this.todoList);
  }

  move(index, target) {
    if (!target) { return; }

    const data = this.todoList.splice(index, 1);
    this.localstorageService.set(this.target, this.todoList);

    let list = this.localstorageService.get(target);
    if (list) {
      list = list.concat(data);
    } else {
      list = data;
    }

    this.localstorageService.set(target, list);
    this.ngOnInit();
  }

  editStart(index) {
    this.todoList[index].isEdit = true;
    this.localstorageService.set(this.target, this.todoList);

    this.editTodo.changes.subscribe(res => {
      if (res.first) {
        res.first.nativeElement.focus();
      }
    });
  }

  update(index, value) {
    this.todoList[index].todo = value;
    this.todoList[index].isEdit = false;
    this.localstorageService.set(this.target, this.todoList);
  }

  updateByBlur(index, value) {
    if (this.isEnterPress) {
      this.isEnterPress = false;
      return;
    }
    this.update(index, value)
  }

  updateByEnter(index, value, event) {
    if (event.keyCode !== this.enterkeyCode) { return; }

    this.isEnterPress = true;
    this.update(index, value);
  }

  switch() {
    this.isHidden = !this.isHidden;
  }

  addStart() {
    this.switch();
    this.addTodo.changes.subscribe(res => {
      if (res.first) {
        res.first.nativeElement.focus();
      }
    });
  }

  back() {
    this.router.navigateByUrl('');
  }

}
