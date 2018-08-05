import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  state = 0;
  loading = true;

  ngOnInit() {
    if (localStorage.getItem("POSActivated")) {
      localStorage.removeItem("POSActivated");
    }
    setInterval(() => {
      if (localStorage.getItem("POSActivated") == "true") {
        this.state = 1;
      } else{
        this.state = 0;
      }
    }, 300);
    setTimeout(() => {
      this.loading= false;
    }, 1000);
  }
}
