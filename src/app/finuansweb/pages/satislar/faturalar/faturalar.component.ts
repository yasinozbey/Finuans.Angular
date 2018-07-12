import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../shared/main.service';

@Component({
  selector: 'app-faturalar',
  templateUrl: './faturalar.component.html',
  styleUrls: ['./faturalar.component.css'],
  providers: [MainService]
})
export class FaturalarComponent implements OnInit {

  dataSource = [];
  dataFields = [];
  info;
  categories;
  selectedItem;
  state = 0;

  getList() {
    this.main.reqGet("Fatura/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
      this.main.reqGet("Fatura/IslemGecmisi").subscribe(resIslem => {
        this.info = resIslem;
      });
    });
  }

  handleItem(e) {
    this.main.reqGet("Fatura/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.main.reqGet("Kategori/Get").subscribe(resKategori => {
        this.categories = resKategori;
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
      url = "Fatura/Insert";
    } else {
      url = "Fatura/Update";
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
