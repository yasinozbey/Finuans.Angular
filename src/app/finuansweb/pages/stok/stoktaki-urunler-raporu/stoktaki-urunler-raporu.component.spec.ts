import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoktakiUrunlerRaporuComponent } from './stoktaki-urunler-raporu.component';

describe('StoktakiUrunlerRaporuComponent', () => {
  let component: StoktakiUrunlerRaporuComponent;
  let fixture: ComponentFixture<StoktakiUrunlerRaporuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoktakiUrunlerRaporuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoktakiUrunlerRaporuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
