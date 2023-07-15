import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheEmployeComponent } from './tache-employe.component';

describe('TacheEmployeComponent', () => {
  let component: TacheEmployeComponent;
  let fixture: ComponentFixture<TacheEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacheEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
