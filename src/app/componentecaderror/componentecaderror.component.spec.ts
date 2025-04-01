import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentecaderrorComponent } from './componentecaderror.component';

describe('ComponentecaderrorComponent', () => {
  let component: ComponentecaderrorComponent;
  let fixture: ComponentFixture<ComponentecaderrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentecaderrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentecaderrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
