import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-fn-form-grid',
  templateUrl: './fn-form-grid.component.html',
  styleUrls: ['./fn-form-grid.component.css']
})
export class FnFormGridComponent implements OnInit {
  @Input("dataSource") dataSource;
  @Input("dataFields") dataFields;
  @Input("selectedItem") selectedItem;
  @Output() rowClick: EventEmitter<any> = new EventEmitter();

  onRowClick(e) {
    this.rowClick.emit(e);
  }
  constructor() { }

  ngOnInit() {
  }

}
