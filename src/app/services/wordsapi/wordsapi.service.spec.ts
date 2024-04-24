import { TestBed } from '@angular/core/testing';

import { WordsapiService } from './wordsapi.service';

describe('WordsapiService', () => {
  let service: WordsapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
