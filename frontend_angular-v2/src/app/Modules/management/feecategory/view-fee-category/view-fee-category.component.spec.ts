import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeeCategoryComponent } from './view-fee-category.component';

describe('ViewFeeCategoryComponent', () => {
  let component: ViewFeeCategoryComponent;
  let fixture: ComponentFixture<ViewFeeCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFeeCategoryComponent]
    });
    fixture = TestBed.createComponent(ViewFeeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
