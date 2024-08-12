import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AdminPage2Component } from './admin-page2.component';

describe('AdminPage2Component', () => {
  let component: AdminPage2Component;
  let fixture: ComponentFixture<AdminPage2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPage2Component],
      imports: [HttpClientModule], // Include HttpClientModule if needed
    });
    fixture = TestBed.createComponent(AdminPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
