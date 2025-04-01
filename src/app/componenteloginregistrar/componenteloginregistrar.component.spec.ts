import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteloginregistrarComponent } from './componenteloginregistrar.component';

describe('ComponenteloginregistrarComponent', () => {
  let component: ComponenteloginregistrarComponent;
  let fixture: ComponentFixture<ComponenteloginregistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteloginregistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteloginregistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
