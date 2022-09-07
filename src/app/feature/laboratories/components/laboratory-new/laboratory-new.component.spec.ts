import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryNewComponent } from './laboratory-new.component';

describe('LaboratoryNewComponent', () => {
  let component: LaboratoryNewComponent;
  let fixture: ComponentFixture<LaboratoryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
