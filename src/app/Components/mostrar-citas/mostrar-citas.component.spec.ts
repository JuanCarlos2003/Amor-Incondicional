import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCitasComponent } from './mostrar-citas.component';

describe('MostrarCitasComponent', () => {
  let component: MostrarCitasComponent;
  let fixture: ComponentFixture<MostrarCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostrarCitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
