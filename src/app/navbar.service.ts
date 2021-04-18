import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private URL = 'https://api.themoviedb.org/3';
  private KEY = 'b02dce24184e28b14cc90ba55e759426';
  constructor(private htpp: HttpClient) { }

  getResultSearch(search) {
    return this.htpp.get(`${this.URL}/search/movie?api_key=${this.KEY}&language=uk&query=${search}`)
      .pipe(map((data: any) => data.results));
  }
}
