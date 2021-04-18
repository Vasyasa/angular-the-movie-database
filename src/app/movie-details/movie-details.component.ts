import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieDetailsService } from '../movie-details.service';
import { ChoosedFilmService } from '../choosed-film.service';

import { Film } from '../interfaces/film.interface';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {
  filmDetail: Film;
  recommended: Film[]
  constructor(private detailService: MovieDetailsService,
    private route: ActivatedRoute,
    private _location: Location,
    private addFilmService: ChoosedFilmService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialiseData(+params['id']);
      console.log(params['id'], 'params');
      window.scrollTo(0, 0);
    });
  }

  initialiseData(id: number) {
    this.detailService.getMovieById(id).subscribe(data => {
      console.log(data);
      this.filmDetail = data;
    });
    this.detailService.getRecommended(id).subscribe(data => {
      this.recommended = data;
      console.log(this.recommended);
    })
  }

  onChangeChoosed(film: Film) {
    film.isChoosed = this.addFilmService.saveChoosed(film.id, film.title);
  }

  backClicked() {
    this._location.back();
  }
}
