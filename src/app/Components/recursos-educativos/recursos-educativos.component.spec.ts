import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosEducativosComponent } from './recursos-educativos.component';

describe('RecursosEducativosComponent', () => {
  let component: RecursosEducativosComponent;
  let fixture: ComponentFixture<RecursosEducativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecursosEducativosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecursosEducativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
