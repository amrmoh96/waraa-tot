import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersSliderComponent } from './characters-slider.component';

describe('CharactersSliderComponent', () => {
  let component: CharactersSliderComponent;
  let fixture: ComponentFixture<CharactersSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
