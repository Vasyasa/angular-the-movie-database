import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../navbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private navService: NavbarService) { }

  ngOnInit(): void { }
  resultData: Object;

  getResult(value) {
    this.navService.getResultSearch(value).subscribe(data => {
      console.log(data);
      document.getElementById('results').style.display = '';
      this.resultData = data;

    });
  }
}
