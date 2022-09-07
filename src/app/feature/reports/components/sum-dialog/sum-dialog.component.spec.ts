import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumDialogComponent } from './sum-dialog.component';

describe('SumDialogComponent', () => {
  let component: SumDialogComponent;
  let fixture: ComponentFixture<SumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
