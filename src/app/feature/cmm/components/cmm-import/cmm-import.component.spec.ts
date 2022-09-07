import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmmImportComponent } from './cmm-import.component';

describe('CmmImportComponent', () => {
  let component: CmmImportComponent;
  let fixture: ComponentFixture<CmmImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmmImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmmImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
