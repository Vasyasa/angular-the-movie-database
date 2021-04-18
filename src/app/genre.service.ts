import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private URL = 'https://api.themoviedb.org/3/genre/movie/list?';
  private KEY = '4581882ce738bbdeafb130c633d39bab';
  constructor(private http: HttpClient) { }

  getGenre() {
    return this.http.get(`${this.URL}api_key=${this.KEY}&language=uk`)

  }
}
