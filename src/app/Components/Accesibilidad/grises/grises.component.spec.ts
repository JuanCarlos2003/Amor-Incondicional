import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrisesComponent } from './grises.component';

describe('GrisesComponent', () => {
  let component: GrisesComponent;
  let fixture: ComponentFixture<GrisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
