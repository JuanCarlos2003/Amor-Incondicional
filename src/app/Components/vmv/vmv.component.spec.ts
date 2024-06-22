import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmvComponent } from './vmv.component';

describe('VmvComponent', () => {
  let component: VmvComponent;
  let fixture: ComponentFixture<VmvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VmvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VmvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
