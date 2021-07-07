import { MovieDetailsService } from './movie-details.service';

import { Film, Genre } from './interfaces/film.interface';
import { of } from 'rxjs';

describe('MovieDetailslService', () => {
  let service: MovieDetailsService;
  let httpClientSpy: { get: jasmine.Spy };
  let choosedFilmServiceSpy: { filmsChoosed: jasmine.Spy };

  beforeEach(() => {
    
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    choosedFilmServiceSpy = jasmine.createSpyObj('ChoosedFilmService', ['filmsChoosed']);
    service = new MovieDetailsService(httpClientSpy as any, choosedFilmServiceSpy as any);



  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
      let isChoosed = choosedFilmServiceSpy.filmsChoosed
      const expectedFilm: Film = {
          id: 1,
          isChoosed: isChoosed,
          title: "title",
          overview: ' ',
          posterPath: 'img',
          genres: [{
              id: 1,
          } as Genre]
      } as unknown as Film



      httpClientSpy.get.and.returnValue(of(expectedFilm));
      service.getMovieById(1).subscribe(films => {
        expect(films).toEqual(expectedFilm, 'expected films');
        done();
      },
        done.fail
      );

    });
});
