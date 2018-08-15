import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-hizmet-ve-urunler',
  templateUrl: './hizmet-ve-urunler.component.html',
  styleUrls: [],
  providers: [ MainService ]
})
export class HizmetVeUrunlerComponent implements OnInit {

  dataSource = [];
  dataSource2 = [];
  dataSource3 = [];
  dataFields = [
    { dataField: 'ID', caption: 'ID', alignment: 'left'},
    { dataField: "Adi", caption: "Adı"},
    { dataField: "Miktar", caption: "Miktar"},
    { dataField: "AlisFiyati", caption: "Alış Fiyatı"},
    { dataField: "SatisFiyati", caption: "Satış Fiyatı"},
  ];
  actions = [
    {actionEvent: "new", actionName:"Yeni Hizmet/Ürün"}
  ]
  taxes = [
    { Name: "0%", Value: 0 },
    { Name: "1%", Value: 1 },
    { Name: "8%", Value: 8 },
    { Name: "18%", Value: 18 },
  ]
  categories;
  currencies;
  selectedItem;
  state = 0;
  info = false;

  getList() {
    this.main.reqGet("StokHizmet/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
  }

  handleGridAction(e) {
    this.dataSource2 = [];
    this.main.reqGet("StokHizmet/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.selectboxHandler();
      this.state = 1;
      this.info = true;
    });
    this.main.reqGet("StokHizmet/IslemGecmisi/" + e.data.ID).subscribe(resIslem => {
      this.dataSource3 = resIslem;
    });
  }

  handleNewAction(e) {
    this.selectboxHandler();
    this.selectedItem = undefined;
    this.state = 2;
    this.info = false;
    this.dataSource2 = [];
  }

  cancelForm() {
    this.state = 0;
    this.selectedItem = undefined;
  }

  saveForm(form) {
    let url;
    if (this.state === 1) {
      url = "StokHizmet/Insert";
    } else {
      url = "StokHizmet/Update";
    }
    this.main.reqPost(url, form.formData).subscribe(res => {
      this.getList();
    });
  }

  addRow() {
    if(this.dataSource2.length > 4){
      this.main.notifier("En fazla 5 adet barkod ekleyebilirsiniz.", false);
    } else{
      this.dataSource2.push({
        Barkod: "",
        Birim: "",
        Miktar: 1,
        Fiyat: 1
      });
    }
  }

  selectboxHandler(){
    this.main.reqGet("Kategori/Get").subscribe(resKategori => {
      this.categories = resKategori;
    });
    this.main.reqGet("Doviz/Get").subscribe(resDoviz => {
      this.currencies = resDoviz;
    });
  }

  constructor(private main: MainService) { }

  ngOnInit(): void {
    this.getList();
  }
}
