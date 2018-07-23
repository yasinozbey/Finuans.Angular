import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StokGecmisiComponent } from './stok-gecmisi.component';

describe('StokGecmisiComponent', () => {
  let component: StokGecmisiComponent;
  let fixture: ComponentFixture<StokGecmisiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StokGecmisiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StokGecmisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
