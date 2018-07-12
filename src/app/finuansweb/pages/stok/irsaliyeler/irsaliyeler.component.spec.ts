import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrsaliyelerComponent } from './irsaliyeler.component';

describe('IrsaliyelerComponent', () => {
  let component: IrsaliyelerComponent;
  let fixture: ComponentFixture<IrsaliyelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrsaliyelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrsaliyelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
