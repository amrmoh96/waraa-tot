import { TestBed } from '@angular/core/testing';

import { MediaTagService } from './media-tag.service';

describe('MediaTagService', () => {
  let service: MediaTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
