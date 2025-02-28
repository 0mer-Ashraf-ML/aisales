import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cbutton1Component } from './cbutton1.component';

describe('Cbutton1Component', () => {
  let component: Cbutton1Component;
  let fixture: ComponentFixture<Cbutton1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cbutton1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cbutton1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
