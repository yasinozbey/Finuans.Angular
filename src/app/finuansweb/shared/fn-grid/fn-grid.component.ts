import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-fn-grid',
  templateUrl: './fn-grid.component.html',
  styleUrls: ['./fn-grid.component.css']
})
export class FnGridComponent implements OnInit {
  @Input("dataSource") dataSource;
  @Input("dataFields") dataFields;
  @Output() rowClick: EventEmitter<any> = new EventEmitter();

  onRowClick(e) {
    this.rowClick.emit(e);
  }
  constructor() { }

  ngOnInit() {
  }

}
