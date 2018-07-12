import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../shared/main.service';

@Component({
  selector: 'app-hizmet-ve-urunler',
  templateUrl: './hizmet-ve-urunler.component.html',
  styleUrls: ['./hizmet-ve-urunler.component.css'],
  providers: [ MainService ]
})
export class HizmetVeUrunlerComponent implements OnInit {

  dataSource = [];
  dataFields = [];
  info;
  categories;
  selectedItem;
  state = 0;

  getList() {
    this.main.reqGet("StokHizmet/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
      this.main.reqGet("Calisan/IslemGecmisi").subscribe(resIslem => {
        this.info = resIslem;
      });
    });
  }

  handleItem(e) {
    this.main.reqGet("StokHizmet/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.main.reqGet("Kategori/Get").subscribe(resKategori => {
        this.categories = resKategori;
      });
      this.state = 2;
    });
  }

  newItem() {
    this.main.reqGet("StokHizmet/Get").subscribe(res => {
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
      url = "StokHizmet/Insert";
    } else {
      url = "StokHizmet/Update";
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
