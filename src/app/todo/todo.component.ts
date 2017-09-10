import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from './shared/localstorage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @ViewChildren('addTag') addTag: QueryList<ElementRef>;

  // TodoList = [
  //   { todo : '宿題', isCompleted: false, isEdit: false }
  // ]
  tagList = [
    // { id: 0, title: '今日中', isSelected: true},
    // { id: 1, title: '今週中', isSelected: false},
    // { id: 2, title: '今月中', isSelected: false},
    // { id: 3, title: '無期限', isSelected: false},
  ]

  idList = [];
  selectedId = 0;
  isHidden = false;

  constructor(
    private router: Router,
    private localstorageService: LocalstorageService
  ) { }

  ngOnInit() {
    this.tagList = this.localstorageService.getTag();
    if (!this.tagList) { return; }
    this.tagList.map(element => this.idList.push(element.id));
  }

  goto(target) {
    this.router.navigateByUrl(target);
  }

  select(target) {
    this.selectedId = target;

    Object.keys(this.tagList).forEach(element => {
      this.tagList[element].isSelected = false;
      if (this.tagList[element].id === target) {
        this.tagList[element].isSelected = true;
      }
    });

    this.localstorageService.set('tag', this.tagList);

  }

  addStart() {
    this.switch();
    this.addTag.changes.subscribe(res => {
      if (res.first) {
        res.first.nativeElement.focus();
      }
    });
  }

  switch() {
    this.isHidden = !this.isHidden;
  }

  addByBlur(tagName) {
    this.switch();
    if (!tagName) { return; }

    this.tagList = this.localstorageService.getTag();
    let number;
    for (number = 0; ; number++) {
      if (!this.idList.includes(number)) {
        break;
      }
    }
    const tag = {id: number, title: tagName, isSelected: false}
    if (this.tagList) {
      this.tagList.push(tag);
    } else {
      this.tagList = [tag];
    }
    this.localstorageService.set('tag', this.tagList);
    this.ngOnInit();
  }

  deleteTag() {
    if (!this.tagList) { return; }
    this.tagList.forEach((element, index) => {
      if (element.isSelected) {
        element.isSelected = false;
        this.localstorageService.remove(element.id);
        this.tagList.splice(index, 1);
      }
    });
    this.localstorageService.set('tag', this.tagList);
    this.ngOnInit();
  }

  clear() {
    if (!confirm('削除しますか?')) { return; }
    localStorage.clear();
  }
}


