import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerrosyGatosComponent } from './perrosy-gatos.component';

describe('PerrosyGatosComponent', () => {
  let component: PerrosyGatosComponent;
  let fixture: ComponentFixture<PerrosyGatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerrosyGatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerrosyGatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
