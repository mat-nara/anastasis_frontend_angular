import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmmDetailComponent } from './cmm-detail.component';

describe('CmmDetailComponent', () => {
  let component: CmmDetailComponent;
  let fixture: ComponentFixture<CmmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmmDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
