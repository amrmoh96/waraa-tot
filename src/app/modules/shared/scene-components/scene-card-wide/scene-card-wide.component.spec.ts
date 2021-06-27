import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneCardWideComponent } from './scene-card-wide.component';

describe('SceneCardWideComponent', () => {
  let component: SceneCardWideComponent;
  let fixture: ComponentFixture<SceneCardWideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneCardWideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneCardWideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
