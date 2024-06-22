import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorcitoComponent } from './colorcito.component';

describe('ColorcitoComponent', () => {
  let component: ColorcitoComponent;
  let fixture: ComponentFixture<ColorcitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorcitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorcitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
