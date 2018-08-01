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

  handleItem(e) {
    if (e.data.IsKasa) {
      this.main.reqGet("KasaHesabi/GetbyId/" + e.data.ID).subscribe(res => {
        this.selectedItem = res;
        this.stateType = "KASA";
        this.state = 2;
      });
      this.main.reqGet("BankaHesabi/IslemGecmisi/" + e.data.ID + "?isKasa=1").subscribe(resIslem => {
        this.info = resIslem;
      });
    } else {
      this.main.reqGet("BankaHesabi/GetbyId/" + e.data.ID).subscribe(res => {
        this.selectedItem = res;
        this.stateType = "BANKA";
        this.state = 2;
      });
      this.main.reqGet("BankaHesabi/IslemGecmisi/" + e.data.ID + "?isKasa=0").subscribe(resIslem => {
        this.info = resIslem;
      });
    }
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
    });
  }

  constructor(private main: MainService) { }

  ngOnInit(): void {
    this.getList();
  }
}
