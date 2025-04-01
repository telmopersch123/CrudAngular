import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteerrorComponent } from './componenteerror.component';

describe('ComponenteerrorComponent', () => {
  let component: ComponenteerrorComponent;
  let fixture: ComponentFixture<ComponenteerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteerrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
