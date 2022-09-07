import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleImportComponent } from './article-import.component';

describe('ArticleImportComponent', () => {
  let component: ArticleImportComponent;
  let fixture: ComponentFixture<ArticleImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
