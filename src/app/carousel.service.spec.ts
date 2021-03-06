import { CarouselService } from './carousel.service';

import { Film, Genre } from './interfaces/film.interface';
import { of } from 'rxjs';

describe('CarouselService', () => {
  let service: CarouselService;
  let httpClientSpy: { get: jasmine.Spy };
  let choosedFilmServiceSpy: { filmsChoosed: jasmine.Spy };

  beforeEach(() => {
    
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    choosedFilmServiceSpy = jasmine.createSpyObj('ChoosedFilmService', ['filmsChoosed']);
    service = new CarouselService(httpClientSpy as any, choosedFilmServiceSpy as any);



  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
      const expectedFilm: Film[] = [{
        id: 1,
        isChoosed: true,
        overview: ' ',
        posterPath: 'img',
        title: ' ',
        genres: [{
          id: 1,
        } as Genre]
      } as Film]

      const mockData = {
        films: expectedFilm,
      };

      httpClientSpy.get.and.returnValue(of(mockData));
      service.getNextMovies().subscribe(films => {
        expect(films).toEqual(expectedFilm, 'expected films');
        done();
      },
        done.fail
      );

    });
});
