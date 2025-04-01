import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentepaiComponent } from './componentepai.component';

describe('ComponentepaiComponent', () => {
  let component: ComponentepaiComponent;
  let fixture: ComponentFixture<ComponentepaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentepaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentepaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
