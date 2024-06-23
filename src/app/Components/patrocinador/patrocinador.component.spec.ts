import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrocinadorComponent } from './patrocinador.component';

describe('PatrocinadorComponent', () => {
  let component: PatrocinadorComponent;
  let fixture: ComponentFixture<PatrocinadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrocinadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatrocinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
