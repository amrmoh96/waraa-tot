import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenceCardSmallComponent } from './scence-card-small.component';

describe('ScenceCardSmallComponent', () => {
  let component: ScenceCardSmallComponent;
  let fixture: ComponentFixture<ScenceCardSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenceCardSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenceCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
