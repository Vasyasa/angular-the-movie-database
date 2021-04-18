import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

import { concatMap } from "rxjs/operators";

import { ChoosedFilmService } from '../choosed-film.service';
import { CarouselService } from '../carousel.service';
import { GenreService } from '../genre.service';

import { Film } from '../interfaces/film.interface';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  films: Film[];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  constructor(
    private carouselService: CarouselService,
    private genreService: GenreService,
    private addFilmService: ChoosedFilmService
  ) { }

  ngOnInit(): void {
    this.carouselService.getNextMovies().pipe(
      concatMap((films: Film[]) => {
        this.films = films;
        console.log(this.films)
        return this.genreService.getGenre();
      })).subscribe((data: any) => {
        let resultGenres = data.genres;
        console.log(resultGenres)
        this.films.forEach(film => {
          film.genres.forEach(genre => {
            genre.name = resultGenres.find(el => el.id == genre.id).name;
          });
        });
      })
  }

  onChangeChoosedMain(film: Film) {
    film.isChoosed = this.addFilmService.saveChoosed(film.id, film.title);
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
