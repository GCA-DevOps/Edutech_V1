import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTwoComponent } from './graph-two.component';

describe('GraphTwoComponent', () => {
  let component: GraphTwoComponent;
  let fixture: ComponentFixture<GraphTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphTwoComponent]
    });
    fixture = TestBed.createComponent(GraphTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
