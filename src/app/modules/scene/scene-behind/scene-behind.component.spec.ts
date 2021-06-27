import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneBehindComponent } from './scene-behind.component';

describe('SceneBehindComponent', () => {
  let component: SceneBehindComponent;
  let fixture: ComponentFixture<SceneBehindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneBehindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneBehindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
