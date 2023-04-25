import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateQuizDialogComponent } from './create-update-quiz-dialog.component';

describe('CreateUpdateQuizDialogComponent', () => {
  let component: CreateUpdateQuizDialogComponent;
  let fixture: ComponentFixture<CreateUpdateQuizDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateQuizDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
