import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockImportComponent } from './stock-import.component';

describe('StockImportComponent', () => {
  let component: StockImportComponent;
  let fixture: ComponentFixture<StockImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
