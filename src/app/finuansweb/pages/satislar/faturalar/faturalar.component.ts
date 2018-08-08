import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-faturalar',
  templateUrl: './faturalar.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class FaturalarComponent implements OnInit {

  dataSource = [];
  dataFields = [
    { dataField: 'ID', caption: 'ID', alignment: 'left'},
    { dataField: 'FaturaTipi', caption: 'Fatura Tipi'},
    { dataField: 'Aciklama', caption: 'Açıklama'},
    { dataField: 'HesapAdi', caption: 'Hesap Adı'},
    { dataField: 'DuzenlenmeTarihi', caption: 'Düzenleme Tarihi'},
    { dataField: 'VadeTarihi', caption: 'Vade Tarihi'},
    { dataField: 'Meblag', caption: 'Meblağ'}
  ];
  actions = [
    {actionEvent: "new", actionName:"Yeni Fatura"}
  ]
  invoiceTypes = [
    {ID: 0, Name: "Satış Faturası"},
    {ID: 1, Name: "Proforma Satış Faturası"},
    {ID: 2, Name: "Satış İrsaliyesi"}
  ];
  paymentStates = [
    { ID: 0, Name: "Tahsil Edilmedi" },
    { ID: 1, Name: "Tahsil Edildi" }
  ];
  info;
  customers;
  categories;
  accounts;
  tags;
  selectedItem;
  state = 0;
  payments;

  getList() {
    this.main.reqGet("Fatura/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
    this.main.reqGet("CariHesap/List").subscribe(res => {
      this.customers = res;
      this.state = 0;
    });
    this.main.reqGet("Kategori/Get").subscribe(resKategori => {
      this.categories = resKategori;
    });
    this.main.reqGet("Etiket/Get").subscribe(resTags => {
      this.tags = resTags;
    });
    this.main.reqGet("KasaHesabi/List").subscribe(resAccounts => {
      this.accounts = resAccounts;
    });
  }

  handleGridAction(e) {
    this.main.reqGet("Fatura/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      if (res.OdemeDurumu) {
        this.main.reqGet("CariHesapHareket/GetbyId/" + res.TahsilatID).subscribe(resPayments => {
          this.selectedItem.Tahsilat = resPayments;
        });
      }
      this.state = 1;
    });
  }

  handleNewAction() {
    this.selectedItem = undefined;
    this.state = 1;
    this.main.reqGet("Kategori/Get").subscribe(res => {
      this.categories = res;
    });
  }

  cancelForm() {
    this.state = 0;
    this.selectedItem = undefined;
  }

  saveForm() {
    let url;
    if (this.state === 1) {
      url = "Fatura/Insert";
    } else {
      url = "Fatura/Update";
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
