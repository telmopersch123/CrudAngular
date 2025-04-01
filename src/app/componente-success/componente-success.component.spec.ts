import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteSuccessComponent } from './componente-success.component';

describe('ComponenteSuccessComponent', () => {
  let component: ComponenteSuccessComponent;
  let fixture: ComponentFixture<ComponenteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
