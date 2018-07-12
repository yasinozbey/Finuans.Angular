import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../shared/main.service';

@Component({
  selector: 'app-tedarikciler',
  templateUrl: './tedarikciler.component.html',
  styleUrls: ['./tedarikciler.component.css'],
  providers: [MainService]
})
export class TedarikcilerComponent implements OnInit {

  dataSource = [];
  dataSource2 = [];
  dataFields = [
    {dataField: "Unvan", caption: "Unvan"},
    {dataField: "TahsilEdilecek", caption: "Tahsil Edilecek"},
    {dataField: "Odenecek", caption: "Ödenecek"},
    {dataField: "Bakiye", caption: "Bakiye"}
  ];
  info;
  categories;
  selectedItem;
  state = 0;

  constructor(private main: MainService) { }

  getList() {
    this.main.reqGet("CariHesap/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
      this.main.reqGet("CariHesap/IslemGecmisi").subscribe(islemRes => {
        this.info = islemRes;
      });
    });
  }

  handleItem(e) {
    this.main.reqGet("Calisan/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.main.reqGet("Kategori/Get").subscribe(res => {
        this.categories = res;
      });
      this.state = 2;
    });
  }

  newItem() {
    this.main.reqGet("Kategori/Get").subscribe(res => {
      this.selectedItem = new Object();
      this.categories = res;
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
      url = "Calisan/Insert";
    } else {
      url = "Calisan/Update";
    }
    this.main.reqPost(url, this.selectedItem).subscribe(res => {
      this.getList();
    });
  }

  addRow() {
    this.dataSource2.push({});
  }

  ngOnInit(): void {
    this.getList();
  }
}

