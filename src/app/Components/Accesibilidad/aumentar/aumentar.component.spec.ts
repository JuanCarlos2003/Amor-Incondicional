import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AumentarComponent } from './aumentar.component';

describe('AumentarComponent', () => {
  let component: AumentarComponent;
  let fixture: ComponentFixture<AumentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AumentarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AumentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
