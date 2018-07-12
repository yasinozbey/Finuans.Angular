import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../shared/main.service';

@Component({
  selector: 'app-teklifler',
  templateUrl: './teklifler.component.html',
  styleUrls: ['./teklifler.component.css'],
  providers: [MainService]
})
export class TekliflerComponent implements OnInit {

  dataSource = [];
  dataFields = [];
  info;
  categories;
  selectedItem;
  state = 0;

  getList() {
    this.main.reqGet("Teklif/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
      this.main.reqGet("Teklif/IslemGecmisi").subscribe(resIslem => {
        this.info = resIslem;
      });
    });
  }

  handleItem(e) {
    this.main.reqGet("Teklif/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.state = 2;
    });
  }

  newItem() {
    this.selectedItem = new Object();
    this.state = 1;
  }

  cancelOperation() {
    this.state = 0;
    this.selectedItem = new Object();
  }

  saveItem() {
    let url;
    if (this.state === 1) {
      url = "Teklif/Insert";
    } else {
      url = "Teklif/Update";
    }
    this.main.reqPost(url, this.selectedItem).subscribe(res => {
      this.getList();
    });
  }

  constructor(private main: MainService) { }

  ngOnInit(): void {
    this.getList();
  }
}
