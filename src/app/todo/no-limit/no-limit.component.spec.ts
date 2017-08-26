import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLimitComponent } from './no-limit.component';

describe('NoLimitComponent', () => {
  let component: NoLimitComponent;
  let fixture: ComponentFixture<NoLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
