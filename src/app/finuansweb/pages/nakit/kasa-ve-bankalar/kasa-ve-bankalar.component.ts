import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-kasa-ve-bankalar',
  templateUrl: './kasa-ve-bankalar.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class KasaVeBankalarComponent implements OnInit {

  dataSource = [];
  dataFields = [];
  actions = [
    {actionEvent: "KASA", actionName: "Yeni Kasa"},
    {actionEvent: "BANKA", actionName: "Yeni Banka"}
  ]
  info;
  categories;
  currencies;
  selectedItem;
  state = 0;
  stateType;

  getList() {
    this.main.reqGet("BankaHesabi/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
    this.main.reqGet("Kategori/Get").subscribe(resKategori => {
      this.categories = resKategori;
    });
    this.main.reqGet("Doviz/Get").subscribe(resDoviz => {
      this.currencies = resDoviz;
    });
  }

  handleGridAction(e) {
    if (e.data.IsKasa) {
      this.main.reqGet("KasaHesabi/GetbyId/" + e.data.ID).subscribe(res => {
        this.selectedItem = res;
        this.stateType = "KASA";
        this.state = 1;
      });
      this.main.reqGet("BankaHesabi/IslemGecmisi/" + e.data.ID + "?isKasa=1").subscribe(resIslem => {
        this.info = resIslem;
      });
    } else {
      this.main.reqGet("BankaHesabi/GetbyId/" + e.data.ID).subscribe(res => {
        this.selectedItem = res;
        this.stateType = "BANKA";
        this.state = 1;
      });
      this.main.reqGet("BankaHesabi/IslemGecmisi/" + e.data.ID + "?isKasa=0").subscribe(resIslem => {
        this.info = resIslem;
      });
    }
  }

  handleNewAction(e) {
    this.selectedItem = undefined;
    this.stateType = e;
    this.state = 1;
  }

  cancelForm() {
    this.state = 0;
    this.selectedItem = undefined;
  }

  saveForm() {
    let url;
    if (this.state === 1) {
      if (this.stateType === 'BANKA') {
        url = "BankaHesabi/Insert";
      } else {
        url = "KasaHesabi/Insert";
      }
    } else {
      if (this.stateType === 'BANKA') {
        url = "BankaHesabi/Update";
      } else {
        url = "KasaHesabi/Update";
      }
    }
    this.main.reqPost(url, this.selectedItem).subscribe(res => {
      this.getList();
      this.selectedItem = undefined;
    });
  }

  constructor(private main: MainService) { }

  ngOnInit(): void {
    this.getList();
  }
}
