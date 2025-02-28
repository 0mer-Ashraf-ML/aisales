import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cbutton2Component } from './cbutton2.component';

describe('Cbutton2Component', () => {
  let component: Cbutton2Component;
  let fixture: ComponentFixture<Cbutton2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cbutton2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cbutton2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
