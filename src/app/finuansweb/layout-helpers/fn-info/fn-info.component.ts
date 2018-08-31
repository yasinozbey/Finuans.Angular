import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fn-info',
  templateUrl: './fn-info.component.html',
  styleUrls: ['./fn-info.component.css']
})
export class FnInfoComponent implements OnInit {
  @Input("dataSource") dataSource;
  @Input("columns") columns;

  constructor() { }

  ngOnInit() {
  }

}
