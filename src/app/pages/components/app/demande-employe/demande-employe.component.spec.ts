import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEmployeComponent } from './demande-employe.component';

describe('DemandeEmployeComponent', () => {
  let component: DemandeEmployeComponent;
  let fixture: ComponentFixture<DemandeEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
