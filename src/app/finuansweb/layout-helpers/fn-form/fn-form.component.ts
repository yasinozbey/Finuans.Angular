import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fn-form',
  templateUrl: './fn-form.component.html',
  styleUrls: ['./fn-form.component.css']
})
export class FnFormComponent implements OnInit {
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  @Input("inheritTitle") inheritTitle = "";
  @Input("newTitle") newTitle = "";
  @Input("editTitle") editTitle = "";
  @Input("selectedItem") selectedItem;

  saveItem() {
    this.onSave.emit("save");
  }

  cancelItem() {
    this.onCancel.emit("cancel");
  }

  constructor() { }

  ngOnInit() {
  }

}
