import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-teklifler',
  templateUrl: './teklifler.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class TekliflerComponent implements OnInit {
  @ViewChild("detailGrid") detailGrid;
  dataSource = [];
  dataSource2 = [];
  dataFields = [
    { dataField: "ID", caption: "ID" },
    { dataField: "Aciklama", caption: "Açıklama" },
    { dataField: "HesapAdi", caption: "Hesap Adı" },
    { dataField: "Fatura", caption: "Fatura" },
    { dataField: "DuzenlenmeTarihi", caption: "Düzenleme Tarihi", dataType: "date" },
    { dataField: "TeklifTutari", caption: "Teklif Tutarı", format: "currency" },
  ];
  info;
  customers;
  currencies;
  selectedItem;
  state = 0;
  products;
  taxes = [
    { Name: "0%", Value: 0 },
    { Name: "1%", Value: 1 },
    { Name: "8%", Value: 8 },
    { Name: "18%", Value: 18 },
  ]

  getList() {
    this.main.reqGet("Teklif/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
    this.main.reqGet("CariHesap/List").subscribe(res => {
      this.customers = res;
    });
    this.main.reqGet("Doviz/Get").subscribe(res => {
      this.currencies = res;
    });
    this.main.reqGet("StokHizmet/Get").subscribe(res => {
      this.products = res;
    });
  }

  handleItem(e) {
    this.main.reqGet("Teklif/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.main.reqGet("Teklif/GetDetail?teklifID=" + e.data.ID).subscribe(x => {
        this.dataSource2 = x;
        this.state = 2;
      })
    });
  }

  newItem = this.main.newItem.bind(this);

  cancelOperation() {
    this.state = 0;
    this.selectedItem = new Object();
  }

  saveItem() {
    let AraToplam = 0;
    let KDVToplam = 0;
    let GenelToplam = 0;
    this.dataSource2.forEach(item => {
      AraToplam += item.BirimFiyat * item.Miktar;
      KDVToplam += ((item.BirimFiyat * item.Miktar) / 100) * item.VergiOran;
      GenelToplam += item.Tutar;
    });
    this.selectedItem["AraToplam"] = AraToplam;
    this.selectedItem["KdvToplam"] = KDVToplam;
    this.selectedItem["İndirim"] = 0;
    this.selectedItem["DovizCinsi"] = 1;
    this.selectedItem["DovizKuru"] = 1;
    this.selectedItem["GenelToplam"] = GenelToplam;

    let reqData = {
      Teklif: this.selectedItem,
      Detay: this.dataSource2
    }
    this.main.reqPost("Teklif/SaveTeklif", reqData).subscribe(res => {
      this.getList();
    });
  }

  getCustomers() {
    this.main.reqGet("CariHesap/Get").subscribe(res => {
      this.customers = res;
    })
  }

  addRow() {
    this.dataSource2.push({ StokID: 0, Miktar: 1, Birim: "", BirimFiyat: 0, VergiOran: 0, Tutar: 0, TeklifID: this.selectedItem.ID });
  }

  calculateSum(e) {
    let updatedDatas = this.detailGrid.instance.getVisibleRows();
    let tempData = [];
    updatedDatas.forEach(item => {
      item.data.Tutar = (item.data.Miktar * item.data.BirimFiyat) * ((100 + item.data.VergiOran) / 100);
      tempData.push(item.data);
    });
    this.dataSource2 = tempData;
  }

  valueChange(rowData, value) {
    debugger;
    this["lookup"].dataSource.forEach(element => {
      if (element.ID == value) {
        debugger;
      }
    });
  }

  constructor(private main: MainService) { 
    this.valueChange = this.valueChange.bind(this);
  }

  ngOnInit(): void {
    this.getList();
    this.getCustomers();
  }
}
