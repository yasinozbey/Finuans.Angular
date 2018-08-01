import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-gider-listesi',
  templateUrl: './gider-listesi.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class GiderListesiComponent implements OnInit {

  dataSource = [];
  dataSource2 = [];
  dataFields = [
    {dataField: "ID", caption: "ID"},
    {dataField: "Aciklama", caption: "Açıklama"},
    {dataField: "HesapAdi", caption: "Hesap Adı"},
    {dataField: "DuzenlemeTarihi", caption: "Düzenleme Tarihi"},
    {dataField: "Bakiye", caption: "Bakiye"},
    {dataField: "Odendi", caption: "Ödendi"},
    {dataField: "Odenecek", caption: "Ödenecek"}
  ];
  info;
  categories;
  currencies;
  accounts;
  tags;
  accountTypes = [
    { ID: 0, Name: "Banka" },
    { ID: 1, Name: "Kasa" }
  ];
  paymentStates = [
    { ID: 0, Name: "Ödenmedi" },
    { ID: 1, Name: "Ödendi" }
  ];
  selectedItem;
  state = 0;
  stateType;

  getList() {
    this.main.reqGet("Gider/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
    this.main.reqGet("Doviz/Get").subscribe(resDoviz => {
      this.currencies = resDoviz;
    });
    this.main.reqGet("Kategori/Get").subscribe(resKategori => {
      this.categories = resKategori;
    });
    this.main.reqGet("Etiket/Get").subscribe(resTags => {
      this.tags = resTags;
    });
    this.main.reqGet("BankaHesabi/List").subscribe(resAccounts => {
      this.accounts = resAccounts;
    });
  }

  handleItem(e) {
    if (e.data.Tip === 0) {
      this.stateType = "MAAS";
    } else if(e.data.Tip === 1) {
      this.stateType = "VERGI";
    } else if(e.data.Tip === 2) {
      this.stateType = "BANKA";
    } else if(e.data.Tip === 3) {
      this.stateType = "AVANS";
    } else if(e.data.Tip === 4) {
      this.stateType = "FIS";
      this.main.reqGet("Fatura/GetDetail?faturaID=" + e.data.ID).subscribe(res => {
        this.dataSource2 = res;
      });
    }
    this.main.reqGet("Gider/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.state = 2;
    });
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
      url = "Gider/Insert";
    } else {
      url = "Gider/Update";
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
