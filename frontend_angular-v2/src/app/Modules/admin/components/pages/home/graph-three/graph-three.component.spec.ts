import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphThreeComponent } from './graph-three.component';

describe('GraphThreeComponent', () => {
  let component: GraphThreeComponent;
  let fixture: ComponentFixture<GraphThreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphThreeComponent]
    });
    fixture = TestBed.createComponent(GraphThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
