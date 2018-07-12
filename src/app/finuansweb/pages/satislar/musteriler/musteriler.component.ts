import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../shared/main.service';

@Component({
  selector: 'app-musteriler',
  templateUrl: './musteriler.component.html',
  styleUrls: ['./musteriler.component.css'],
  providers: [MainService]
})
export class MusterilerComponent implements OnInit {

  dataSource = [];
  dataFields = [
    {dataField: "Unvan", caption: "Unvan"},
    {dataField: "Bakiye", caption: "Bakiye"},
    {dataField: "Odenecek", caption: "Ödenecek"},
    {dataField: "TahsilEdilcek", caption: "Tahsil Edilecek"}
  ];
  info;
  cities;
  selectedItem;
  state = 0;

  getList() {
    this.main.reqGet("CariHesap/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
      this.main.reqGet("CariHesap/IslemGecmisi").subscribe(resIslem => {
        this.info = resIslem;
      });
    });
  }

  handleItem(e) {
    debugger;
    this.main.reqGet("CariHesap/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.main.reqGet("Sehir/Get").subscribe(resSehir => {
        this.cities = resSehir;
      });
      this.state = 2;
    });
  }

  newItem() {
    this.main.reqGet("Sehir/Get").subscribe(res => {
      this.selectedItem = new Object();
      this.cities = res;
      this.state = 1;
    });
  }

  cancelOperation() {
    this.state = 0;
    this.selectedItem = new Object();
  }

  saveItem() {
    let url;
    if (this.state === 1) {
      url = "CariHesap/Insert";
    } else {
      url = "CariHesap/Update";
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
