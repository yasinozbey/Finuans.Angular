import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-giderler-raporu',
  templateUrl: './giderler-raporu.component.html',
  styleUrls: []
})
export class GiderlerRaporuComponent implements OnInit {

  areas;

  constructor() {
      this.areas = [{
        country: "Russia",
        area: 12
    }, {
        country: "Canada",
        area: 7
    }, {
        country: "USA",
        area: 7
    }, {
        country: "China",
        area: 7
    }, {
        country: "Brazil",
        area: 6
    }, {
        country: "Australia",
        area: 5
    }, {
        country: "India",
        area: 2
    }, {
        country: "Others",
        area: 55
    }];
  }

  pointClickHandler(e) {
      this.toggleVisibility(e.target);
  }

  legendClickHandler (e) {
      let arg = e.target,
          item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

      this.toggleVisibility(item);
  }

  toggleVisibility(item) {
      if(item.isVisible()) {
          item.hide();
      } else { 
          item.show();
      }
  }

  ngOnInit() {
  }

}
