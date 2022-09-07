import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionNewComponent } from './version-new.component';

describe('VersionNewComponent', () => {
  let component: VersionNewComponent;
  let fixture: ComponentFixture<VersionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
