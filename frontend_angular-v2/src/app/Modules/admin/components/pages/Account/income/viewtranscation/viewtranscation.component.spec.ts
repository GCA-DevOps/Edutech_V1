import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtranscationComponent } from './viewtranscation.component';

describe('ViewtranscationComponent', () => {
  let component: ViewtranscationComponent;
  let fixture: ComponentFixture<ViewtranscationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewtranscationComponent]
    });
    fixture = TestBed.createComponent(ViewtranscationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
