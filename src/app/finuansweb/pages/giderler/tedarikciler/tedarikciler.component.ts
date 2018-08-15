import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-tedarikciler',
  templateUrl: './tedarikciler.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class TedarikcilerComponent implements OnInit {
  @ViewChild("detailGrid") detailGrid;
  dataSource = [];
  dataSource2 = [];
  dataFields = [
    { dataField: 'ID', caption: 'ID', alignment: 'left'},
    { dataField: "Unvan", caption: "Unvan" },
    { dataField: "TahsilEdilecek", caption: "Tahsil Edilecek", format: '#0.00', alignment: 'right' },
    { dataField: "Odenecek", caption: "Ödenecek", format: '#0.00', alignment: 'right' },
    { dataField: "Bakiye", caption: "Bakiye", format: '#0.00', alignment: 'right' }
  ];
  actions = [
    { actionEvent: "new", actionName: "Yeni Tedarikçi" }
  ]
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

  handleGridAction(e) {
    this.main.reqGet("CariHesap/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.state = 1;
    });
    this.main.reqGet("CariHesap/IslemGecmisi/" + e.data.ID).subscribe(islemRes => {
      this.info = islemRes;
    });
  }

  handleNewAction() {
    this.selectedItem = undefined;
    this.state = 2;
  }

  cancelForm() {
    this.state = 0;
    this.selectedItem = undefined;
  }

  saveForm(form) {
    if(!form.instance.validate()["isValid"]){
      this.main.notifier("Lütfen zorunlu alanları doldurun.", false);
      return false;
    }
    let reqData = {
      CariHesap: form.formData,
      Yetkili: this.dataSource2
    }
    this.main.reqPost("CariHesap/SaveCustomer", reqData).subscribe(res => {
      this.getList();
      this.selectedItem = undefined;
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

  getKasaba() {
    this.main.reqGet("Sehir/GetKasaba?SehirID=" + this.selectedItem.SehirID).subscribe(resKasaba => {
      this.districts = resKasaba;
    });
  }

  constructor(private main: MainService) { 
    this.getKasaba =this.getKasaba.bind(this);
  }

  ngOnInit(): void {
    this.getList();
  }
}

