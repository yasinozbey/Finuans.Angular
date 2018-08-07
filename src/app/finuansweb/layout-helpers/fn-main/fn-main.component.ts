import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fn-main',
  templateUrl: './fn-main.component.html',
  styleUrls: ['./fn-main.component.css']
})
export class FnMainComponent implements OnInit {
  @Output() rowClick: EventEmitter<any> = new EventEmitter();
  @Output() actionClick: EventEmitter<any> = new EventEmitter();
  @Input("title") title = "";
  @Input("dataFields") dataFields = [];
  @Input("dataSource") dataSource = [];
  @Input("actions") actions = [];

  constructor() { }

  onRowClick(e) {
    this.rowClick.emit(e);
  }

  onAction(e) {
    this.actionClick.emit(e);
  }

  ngOnInit() {
  }

}
