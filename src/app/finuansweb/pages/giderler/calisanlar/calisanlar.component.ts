import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../shared/main.service';

@Component({
  selector: 'app-calisanlar',
  templateUrl: './calisanlar.component.html',
  styleUrls: ['./calisanlar.component.css'],
  providers: [MainService]
})
export class CalisanlarComponent implements OnInit {

  dataSource = [];
  dataFields = [
    {dataField: "Adi", caption: "Adı"},
    {dataField: "Soyadi", caption: "Soyadı"},
    {dataField: "EpostaAdresi", caption: "E-mail"},
    {dataField: "IBAN", caption: "IBAN"},
    {dataField: "Product", caption: "Bakiye"},
  ];
  info;
  categories;
  selectedItem;
  state = 0;

  constructor(private main: MainService) { }

  getList() {
    this.main.reqGet("Calisan/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
      this.main.reqGet("Calisan/IslemGecmisi").subscribe(resIslem => {
        this.info = res;
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

  ngOnInit(): void {
    this.getList();
  }
}
