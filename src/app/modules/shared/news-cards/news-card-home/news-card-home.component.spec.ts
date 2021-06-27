import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardHomeComponent } from './news-card-home.component';

describe('NewsCardHomeComponent', () => {
  let component: NewsCardHomeComponent;
  let fixture: ComponentFixture<NewsCardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsCardHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
