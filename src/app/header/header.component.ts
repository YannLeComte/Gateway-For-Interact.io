import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openNav(): void {

    let width = document.getElementById("mySidenav").style.width;

    if (width === '') {
      document.getElementById("mySidenav").style.width = '300px';

    }else {
      document.getElementById("mySidenav").style.width = '';
    }
  }
}
