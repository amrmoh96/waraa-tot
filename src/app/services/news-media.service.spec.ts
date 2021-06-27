import { TestBed } from '@angular/core/testing';

import { NewsMediaService } from './news-media.service';

describe('NewsMediaService', () => {
  let service: NewsMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
