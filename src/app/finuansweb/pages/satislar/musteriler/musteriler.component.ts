import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-musteriler',
  templateUrl: './musteriler.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class MusterilerComponent implements OnInit {

  @ViewChild("detailGrid") detailGrid;
  dataSource = [];
  dataSource2 = [];
  dataFields = [
    { dataField: "Unvan", caption: "Unvan" },
    { dataField: "Bakiye", caption: "Bakiye" },
    { dataField: "Odenecek", caption: "Ödenecek" },
    { dataField: "TahsilEdilcek", caption: "Tahsil Edilecek" }
  ];
  info;
  cities;
  districts;
  categories;
  selectedItem;
  supplierTypes = [
    { ID: 0, Name: "Tüzel Kişi" },
    { ID: 1, Name: "Gerçek Kişi" },
  ]
  state = 0;

  getList() {
    this.main.reqGet("CariHesap/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
    this.main.reqGet("Sehir/Get").subscribe(resSehir => {
      this.cities = resSehir;
    });
    this.main.reqGet("Kategori/Get").subscribe(resKategori => {
      this.categories = resKategori;
    });
  }

  handleItem(e) {
    this.main.reqGet("CariHesap/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.main.reqGet("Sehir/GetKasaba?SehirID=" + res.SehirID).subscribe(resKasaba => {
        this.districts = resKasaba;
      });
      this.main.reqGet("CariYetkili/Get/" + res.SehirID).subscribe(resYetkili => {
        this.dataSource2 = resYetkili;
      })
      this.state = 2;
    });
    this.main.reqGet("CariHesap/IslemGecmisi/" + e.data.ID).subscribe(resIslem => {
      this.info = resIslem;
    });
  }

  newItem = this.main.newItem.bind(this);

  cancelOperation() {
    this.state = 0;
    this.selectedItem = new Object();
  }

  saveItem() {
    let reqData = {
      CariHesap:this.selectedItem,
      Yetkili: this.dataSource2
    }
    this.main.reqPost("CariHesap/SaveCustomer", reqData).subscribe(res => {
      this.getList();
    });
  }

  addRow(){
    this.dataSource2.push({Adi:"",Eposta:"",Telefon:"",Notlar:""});
  }

  syncDataSource(e){
    let updatedDatas = this.detailGrid.instance.getVisibleRows();
    let tempData = [];
    updatedDatas.forEach(item => {
      item.data.CariID = this.selectedItem.ID;
      tempData.push(item.data);
    });
    this.dataSource2 = tempData;
  }

  constructor(private main: MainService) { }

  ngOnInit(): void {
    this.getList();
  }

}
