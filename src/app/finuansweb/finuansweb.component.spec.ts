import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinuanswebComponent } from './finuansweb.component';

describe('FinuanswebComponent', () => {
  let component: FinuanswebComponent;
  let fixture: ComponentFixture<FinuanswebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinuanswebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinuanswebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
