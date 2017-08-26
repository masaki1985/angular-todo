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
  isAllChecked = true;
  completedLabel = 'isCompleted';
  enterkeyCode = 13;

  constructor(
    private router: Router,
    private localstorageService: LocalstorageService
  ) { }

  ngOnInit() {
    this.todoList = this.localstorageService.get(this.target);
    if (!this.todoList || this.todoList.length === 0) {
      this.isAllChecked = false;
      return;
    }
    this.todoList.forEach(res => {
      if (res[this.completedLabel] === false) {
        this.isAllChecked = false;
      }
    })
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
      alert('完了していないので削除できません');
      return;
    }
    this.todoList.splice(index, 1);
    this.localstorageService.set(this.target, this.todoList);
  }

  move(index, target) {
    if (!target) { return; }

    const data = this.todoList.splice(index, 1);
    this.localstorageService.set(this.target, this.todoList);

    let moveList = this.localstorageService.get(target);
    if (!moveList) {
      moveList = [];
    }
    moveList = moveList.concat(data);
    // if (moveList) {
    //   moveList = moveList.concat(data);
    // } else {
    //   moveList = data;
    // }

    this.localstorageService.set(target, moveList);
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

  checkAll() {
    if (!this.todoList) { return; }
    if (!this.isAllChecked) {
      this.todoList.forEach(res => res[this.completedLabel] = true);
      this.localstorageService.set(this.target, this.todoList);
      this.isAllChecked = true;
    } else {
      this.todoList.forEach(res => res[this.completedLabel] = false);
      this.localstorageService.set(this.target, this.todoList);
      this.isAllChecked = false;
    }

  }

  deleteAll() {
    if (!confirm('完了済みのリストを全て削除しますか？')) { return; }
    let remainedList = [];
    Object.keys(this.todoList).forEach(index => {
      if (this.todoList[index][this.completedLabel] === false) {
        remainedList = remainedList.concat(this.todoList[index]);
      }
    })
    this.localstorageService.set(this.target, remainedList);
    this.ngOnInit();
  }

  moveAll(target) {
    if (!target) { return; }
    if (target === this.target) { return; }
    if (!confirm('リストを全て移動しますか')) { return; }

    let moveList = this.localstorageService.get(target);
    if (!moveList) {
      moveList = [];
    }
    Object.keys(this.todoList).forEach(index => {
      moveList = moveList.concat(this.todoList[index]);
    })
    this.localstorageService.remove(this.target);
    this.localstorageService.set(target, moveList);
    this.ngOnInit();
  }

}
