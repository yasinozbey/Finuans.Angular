import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../shared/main.service';

@Component({
  selector: 'app-gider-listesi',
  templateUrl: './gider-listesi.component.html',
  styleUrls: ['./gider-listesi.component.css'],
  providers: [MainService]
})
export class GiderListesiComponent implements OnInit {

  dataSource = [];
  dataFields = [];
  info;
  categories;
  selectedItem;
  state = 0;
  stateType;

  getList() {
    this.main.reqGet("Gider/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
      this.main.reqGet("Gider/IslemGecmisi").subscribe(resIslem => {
        this.info = resIslem;
      });
    });
  }

  handleItem(e) {
    // this.main.reqGet("Calisan/GetbyId/" + e.data.ID).subscribe(res => {
    //   this.selectedItem = res;
    //   this.main.reqGet("Kategori/Get").subscribe(resKategori => {
    //     this.categories = resKategori;
    //   });
    //   this.state = 2;
    // });
  }

  newItem(e) {
    this.selectedItem = new Object();
    this.stateType = e;
    this.state = 1;
  }

  cancelOperation() {
    this.state = 0;
    this.selectedItem = new Object();
  }

  saveItem() {
    let url;
    if (this.state === 1) {
      url = "Gider/Insert";
    } else {
      url = "Gider/Update";
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
