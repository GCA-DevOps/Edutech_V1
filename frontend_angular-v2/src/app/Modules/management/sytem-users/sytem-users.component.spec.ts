import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SytemUsersComponent } from './sytem-users.component';

describe('SytemUsersComponent', () => {
  let component: SytemUsersComponent;
  let fixture: ComponentFixture<SytemUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SytemUsersComponent]
    });
    fixture = TestBed.createComponent(SytemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
