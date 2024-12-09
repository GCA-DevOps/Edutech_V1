import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTypesComponent } from './income-types.component';

describe('IncomeTypesComponent', () => {
  let component: IncomeTypesComponent;
  let fixture: ComponentFixture<IncomeTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeTypesComponent]
    });
    fixture = TestBed.createComponent(IncomeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
