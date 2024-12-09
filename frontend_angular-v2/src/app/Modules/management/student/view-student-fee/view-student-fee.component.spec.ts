import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentFeeComponent } from './view-student-fee.component';

describe('ViewStudentFeeComponent', () => {
  let component: ViewStudentFeeComponent;
  let fixture: ComponentFixture<ViewStudentFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStudentFeeComponent]
    });
    fixture = TestBed.createComponent(ViewStudentFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
