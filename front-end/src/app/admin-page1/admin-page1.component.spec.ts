import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AdminPage1Component } from './admin-page1.component';

describe('AdminPage1Component', () => {
  let component: AdminPage1Component;
  let fixture: ComponentFixture<AdminPage1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPage1Component],
      imports: [HttpClientModule], // Include HttpClientModule if needed
    });
    fixture = TestBed.createComponent(AdminPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
