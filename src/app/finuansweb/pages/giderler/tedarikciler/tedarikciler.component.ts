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
  supplierTypes = [
    { ID: 0, Name: "Tüzel Kişi" },
    { ID: 1, Name: "Gerçek Kişi" },
  ]
  info;
  categories;
  cities;
  districts;
  currencies;
  selectedItem;
  state = 0;

  constructor(private main: MainService) { }

  getList() {
    this.main.reqGet("CariHesap/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
    this.main.reqGet("Kategori/Get").subscribe(res => {
      this.categories = res;
    });
    this.main.reqGet("Sehir/Get").subscribe(res => {
      this.cities = res;
    });
    this.main.reqGet("Kasaba/Get").subscribe(res => {
      this.districts = res;
    });
    this.main.reqGet("Doviz/Get").subscribe(resDoviz => {
      this.currencies = resDoviz;
    });
  }

  handleItem(e) {
    this.main.reqGet("CariHesap/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.state = 2;
    });
    this.main.reqGet("CariHesap/IslemGecmisi/" + e.data.ID).subscribe(islemRes => {
      this.info = islemRes;
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

