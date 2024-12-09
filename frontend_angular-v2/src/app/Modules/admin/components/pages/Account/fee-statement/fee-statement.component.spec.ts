import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeStatementComponent } from './fee-statement.component';

describe('FeeStatementComponent', () => {
  let component: FeeStatementComponent;
  let fixture: ComponentFixture<FeeStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeStatementComponent]
    });
    fixture = TestBed.createComponent(FeeStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
