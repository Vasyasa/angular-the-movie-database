import { TestBed } from '@angular/core/testing';

import { ChoosedFilmService } from './choosed-film.service';

describe('AddFilmService', () => {
  let service: ChoosedFilmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoosedFilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
