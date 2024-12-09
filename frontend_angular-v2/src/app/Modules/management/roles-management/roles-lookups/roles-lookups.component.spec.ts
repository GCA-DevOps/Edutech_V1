import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesLookupsComponent } from './roles-lookups.component';

describe('RolesLookupsComponent', () => {
  let component: RolesLookupsComponent;
  let fixture: ComponentFixture<RolesLookupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesLookupsComponent]
    });
    fixture = TestBed.createComponent(RolesLookupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
