import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Film, Genre } from './interfaces/film.interface';
import { Observable } from 'rxjs';
import { AddFilmService as ChoosedFilmService } from './choosed-film.service';





@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  films: Film[];

  private URL = 'https://api.themoviedb.org/3';
  private KEY = '4581882ce738bbdeafb130c633d39bab';
  constructor(private htpp: HttpClient,
    private choosedFilmService: ChoosedFilmService
    ) { }


  getNextMovies(): Observable<Film[]> {
    return this.htpp
      .get(`${this.URL}/movie/popular?api_key=${this.KEY}&language=uk`)
      .pipe(map((data: any) => {
        let films = data.results;
        return films.map((film) => {
          return {
            posterPath: film.poster_path,
            genres: film.genre_ids.map(id => { return { id: id } as Genre }),
            id: film.id,
            title: film.title,
            isChoosed: this.choosedFilmService.filmsChoosed.find(choosedFilm => choosedFilm.id == film.id)
          }
        });
      }));
  }


}
