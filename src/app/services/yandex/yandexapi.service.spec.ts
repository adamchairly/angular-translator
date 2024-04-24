import { TestBed } from '@angular/core/testing';

import { YandexapiService } from './yandexapi.service';

describe('YandexapiService', () => {
  let service: YandexapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YandexapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
