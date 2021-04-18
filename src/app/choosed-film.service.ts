import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ChoosedFilmService {
  filmsChoosed = [];

  constructor() {
    this.getChoosed();
  }

  saveChoosed(idFilm: number, nameFilm: string): boolean {
    if (this.filmsChoosed.find(film => film.id == idFilm && film.name == nameFilm)) {
      this.deleteChoosed(idFilm);
      return false;
    } else {
      this.filmsChoosed.push({ id: idFilm, name: nameFilm });
      localStorage.setItem('choosed', JSON.stringify(this.filmsChoosed));
      console.log(this.filmsChoosed);
      return true;
    }
  }

  getChoosed() {
    this.filmsChoosed = JSON.parse(localStorage.getItem('choosed')) || [];
    console.log(this.filmsChoosed, 'this.filmsChoosed');
    return this.filmsChoosed;
  }

  clearChoosed() {
    localStorage.clear();
    this.filmsChoosed = [];
  }

  deleteChoosed(id: number) {
    this.filmsChoosed = this.filmsChoosed.filter(film => film.id != id);
    localStorage.setItem('choosed', JSON.stringify(this.filmsChoosed));
  }
}
