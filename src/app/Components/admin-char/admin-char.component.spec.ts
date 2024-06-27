import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCharComponent } from './admin-char.component';

describe('AdminCharComponent', () => {
  let component: AdminCharComponent;
  let fixture: ComponentFixture<AdminCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCharComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
