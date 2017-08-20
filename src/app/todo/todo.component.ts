import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @ViewChildren('inputTodo') inputTodo: QueryList<ElementRef>;

  isEnterPress = false;

  TodoList = [
    { todo : '宿題', isCompleted: false, isEdit: false },
    { todo : '昼寝', isCompleted: false, isEdit: false },
    { todo : '食事', isCompleted: false, isEdit: false }
  ]

  constructor() { }

  ngOnInit() {
  }

  add(element) {
    if (!element.value) { return; }
    const data = { todo: element.value, isCompleted: false, isEdit: false}
    this.TodoList.push(data);
    element.value = '';
  }

  doCheck(index) {
    if (this.TodoList[index].isCompleted) {
      this.TodoList[index].isCompleted = false;
    } else {
      this.TodoList[index].isCompleted = true;
    }
  }

  delete(index) {
    if (!this.TodoList[index].isCompleted) { return; }
    this.TodoList.splice(index, 1);
  }

  edit(index) {
    this.TodoList[index].isEdit = true;

    this.inputTodo.changes.subscribe(res => {
      if (res.first) {
        res.first.nativeElement.focus();
      }
    })
  }

  update(index, value) {
    if (this.isEnterPress) {
      this.isEnterPress = false;
      return;
    }
    this.TodoList[index].todo = value;
    this.TodoList[index].isEdit = false;
  }

  updateByEnter(index, value) {
    this.isEnterPress = true;
    this.TodoList[index].todo = value;
    this.TodoList[index].isEdit = false;
  }
}


