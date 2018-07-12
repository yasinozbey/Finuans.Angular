import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../shared/main.service';

@Component({
  selector: 'app-kasa-ve-bankalar',
  templateUrl: './kasa-ve-bankalar.component.html',
  styleUrls: ['./kasa-ve-bankalar.component.css'],
  providers: [MainService]
})
export class KasaVeBankalarComponent implements OnInit {

  dataSource = [];
  dataFields = [];
  info;
  categories;
  selectedItem;
  state = 0;
  stateType;

  getList() {
    this.main.reqGet("BankaHesabi/List").subscribe(res => {
      this.dataSource = res;
      this.main.reqGet("KasaHesabi/IslemGecmisi").subscribe(resKasa => {
        this.dataSource.concat(resKasa);
        this.state = 0;
      });
      this.main.reqGet("BankaHesabi/IslemGecmisi").subscribe(resIslem => {
        this.info = resIslem;
        this.main.reqGet("BankaHesabi/IslemGecmisi").subscribe(resKasaIslem => {
          this.info.concat(resKasaIslem);
        });
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
      if (this.stateType === 'BANKA') {
        url = "BankaHesabi/Insert";
      } else{
        url = "KasaHesabi/Insert";
      }
    } else {
      if (this.stateType === 'BANKA') {
        url = "BankaHesabi/Update";
      } else{
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
