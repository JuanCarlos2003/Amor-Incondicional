import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsLoginComponent } from './sms-login.component';

describe('SmsLoginComponent', () => {
  let component: SmsLoginComponent;
  let fixture: ComponentFixture<SmsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
