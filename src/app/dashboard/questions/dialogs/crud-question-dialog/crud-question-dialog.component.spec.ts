import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudQuestionDialogComponent } from './crud-question-dialog.component';

describe('CrudQuestionDialogComponent', () => {
  let component: CrudQuestionDialogComponent;
  let fixture: ComponentFixture<CrudQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudQuestionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
