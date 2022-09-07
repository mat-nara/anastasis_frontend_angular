import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmmListComponent } from './cmm-list.component';

describe('CmmListComponent', () => {
  let component: CmmListComponent;
  let fixture: ComponentFixture<CmmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmmListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
