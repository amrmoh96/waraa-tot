import { TestBed } from '@angular/core/testing';

import { CharacterMediaService } from './character-media.service';

describe('CharacterMediaService', () => {
  let service: CharacterMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
