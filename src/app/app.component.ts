import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  state = 0;

  ngOnInit() {
    if (localStorage.getItem("POSActivated")) {
      this.state = 1;
    } else{
      this.state = 0;
    }
    setInterval(() => {
      if (localStorage.getItem("POSActivated") == "true") {
        this.state = 1;
      } else{
        this.state = 0;
      }
    }, 300);
  }
}
