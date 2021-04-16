import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AddFilmService as ChoosedFilmService } from '../choosed-film.service';

@Component({
  selector: 'app-choosed',
  templateUrl: './choosed.component.html',
  styleUrls: ['./choosed.component.scss']
})

export class ChoosedComponent implements OnInit {
  listIds = [];

  public get filmsChoosed(): any[] {
    return this.choosedFilm.filmsChoosed;
  }

  check;

  constructor(
    private _location: Location,
    public choosedFilm: ChoosedFilmService
  ) { }

  deleteList() {
    this.choosedFilm.clearChoosed();
  }

  ngOnInit(): void {

  }

  deleteChoosed(id: number) {
    this.choosedFilm.deleteChoosed(id);
  }

  backClicked() {
    this._location.back();
  }

}
