import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsOfAccountsComponent } from './charts-of-accounts.component';

describe('ChartsOfAccountsComponent', () => {
  let component: ChartsOfAccountsComponent;
  let fixture: ComponentFixture<ChartsOfAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsOfAccountsComponent]
    });
    fixture = TestBed.createComponent(ChartsOfAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
