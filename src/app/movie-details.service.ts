import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AddFilmService as ChoosedFilmService } from './choosed-film.service';

import { Film, Genre } from './interfaces/film.interface';


@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  private URL = 'https://api.themoviedb.org/3';
  private KEY = '4581882ce738bbdeafb130c633d39bab';
  constructor(private htpp: HttpClient,
    private choosedFilmService: ChoosedFilmService
  ) { }

  getMovieById(id: number): Observable<Film> {
    return this.htpp
      .get(`${this.URL}/movie/${id}?api_key=${this.KEY}&language=uk`).pipe(map((data: any) => {
        return {
          id: data.id,
          title: data.title,
          genres: data.genres,
          posterPath: data.poster_path,
          overview: data.overview,
          isChoosed: this.choosedFilmService.filmsChoosed.find(choosedFilm => choosedFilm.id == data.id)
        } as Film;
      }));
  }

  getRecommended(id: number): Observable<Film[]> {
    return this.htpp
      .get(`${this.URL}/movie/${id}/recommendations?api_key=${this.KEY}&language=uk`)
      .pipe(map((data: any) => {
        let films = data.results;
        return films.map((film) => {
          return {
            posterPath: film.poster_path,
            genres: film.genre_ids.map(id => { return { id: id } as Genre }),
            id: film.id,
            title: film.title
          }
        });
      }));
  }
}

