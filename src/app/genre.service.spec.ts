import { GenreService } from './genre.service';

import { Genre } from './interfaces/film.interface';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


describe('GenreFilmService', () => {
  let service: GenreService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GenreService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getGenre should return value from observable',
    (done: DoneFn) => {
      const expectResult: Genre[] = [{
        id: 1,
        name: 'Бойовик'
      } as Genre];

      const mockData = {
        genres: expectResult
      };
      
      httpClientSpy.get.and.returnValue(of(mockData));
      service.getGenre().subscribe(genres => {
        expect(genres).toEqual(expectResult, 'expected genres');
        done();
      },
      done.fail
      );
    });

});

