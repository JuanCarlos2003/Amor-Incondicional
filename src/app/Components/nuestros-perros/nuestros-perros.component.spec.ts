import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosPerrosComponent } from './nuestros-perros.component';

describe('NuestrosPerrosComponent', () => {
  let component: NuestrosPerrosComponent;
  let fixture: ComponentFixture<NuestrosPerrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestrosPerrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuestrosPerrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
