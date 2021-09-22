import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeTableComponent } from './initiative-table.component';

describe('InitiativeTableComponent', () => {
  let component: InitiativeTableComponent;
  let fixture: ComponentFixture<InitiativeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiativeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
