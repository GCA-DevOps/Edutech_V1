import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCollectionsComponent } from './fee-collections.component';

describe('FeeCollectionsComponent', () => {
  let component: FeeCollectionsComponent;
  let fixture: ComponentFixture<FeeCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeCollectionsComponent]
    });
    fixture = TestBed.createComponent(FeeCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
