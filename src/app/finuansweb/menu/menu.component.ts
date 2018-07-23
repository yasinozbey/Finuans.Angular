import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  launchPOS() {
    localStorage.setItem("POSActivated", "true");
  }
  constructor() { }

  ngOnInit() {
  }

}
