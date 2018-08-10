import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-faturalar',
  templateUrl: './faturalar.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class FaturalarComponent implements OnInit {
  @ViewChild("detailGrid") detailGrid;
  dataSource = [];
  dataSource2 = [];
  dataFields = [
    { dataField: 'ID', caption: 'ID', alignment: 'left'},
    { dataField: 'FaturaTipi', caption: 'Fatura Tipi'},
    { dataField: 'Aciklama', caption: 'Açıklama'},
    { dataField: 'HesapAdi', caption: 'Hesap Adı'},
    { dataField: 'DuzenlenmeTarihi', caption: 'Düzenleme Tarihi', dataType: "date", format: 'dd.MM.y'},
    { dataField: 'VadeTarihi', caption: 'Vade Tarihi', dataType: "date", format: 'dd.MM.y'},
    { dataField: 'Meblag', caption: 'Meblağ', format: '#0.00'}
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
  tags;
  accounts;
  currencies;
  selectedItem = {};
  state = 0;
  products;
  selectedRow = 0;
  totalDiscount = 0;
  totalOiv = 0;
  totalOtv = 0;
  taxes = [
    { Name: "0%", Value: 0 },
    { Name: "1%", Value: 1 },
    { Name: "8%", Value: 8 },
    { Name: "18%", Value: 18 },
  ];
  discountTypes = [
    { ID: 0, Name: "Oran (%)" },
    { ID: 1, Name: "Tutar" }
  ];
  defaultDate = new Date();

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
    this.main.reqGet("StokHizmet/Get").subscribe(res => {
      this.products = res;
    });
  }

  handleGridAction(e) {
    this.main.reqGet("Fatura/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      if (res.OdemeDurumu) {
        this.main.reqGet("CariHesapHareket/GetbyId/" + res.TahsilatID).subscribe(resPayments => {
          this.selectedItem["Tahsilat"] = resPayments;
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

  saveForm(form) {
    if(!form.instance.validate()["isValid"]){
      this.main.notifier("Lütfen zorunlu alanları doldurun.", false);
      return false;
    }
    if(!this.selectedItem){
      this.main.notifier("Lütfen bir Hizmet/Ürün ekleyin.", false);
      return false;
    }
    let AraToplam = 0;
    let KDVToplam = 0;
    let GenelToplam = 0;
    this.dataSource2.forEach(item => {
      AraToplam += item.BirimFiyat * item.Miktar;
      KDVToplam += ((item.BirimFiyat * item.Miktar) / 100) * item.VergiOran;
      GenelToplam += item.Tutar;
    });
    this.selectedItem && (this.selectedItem["AraToplam"] = AraToplam);
    this.selectedItem && (this.selectedItem["KdvToplam"] = KDVToplam);
    this.selectedItem && (this.selectedItem["IndirimToplam"] = this.totalDiscount);
    this.selectedItem && (this.selectedItem["OivTutari"] = this.totalOiv);
    this.selectedItem && (this.selectedItem["OtvTutari"] = this.totalOtv);
    this.selectedItem && (this.selectedItem["DovizCinsi"] = 1);
    this.selectedItem && (this.selectedItem["DovizKuru"] = 1);
    this.selectedItem && (this.selectedItem["GenelToplam"] = GenelToplam);

    let reqData = {
      Teklif: this.selectedItem,
      Detay: this.dataSource2
    }
    this.main.reqPost("Fatura/Insert", reqData).subscribe(res => {
      this.getList();
    });
  }

  addRow() {
    this.dataSource2.push({
      ID: 0,
      StokID: 1,
      Miktar: 1,
      Birim: "",
      BirimFiyat: 0,
      VergiOran: 0,
      Tutar: 0,
      TeklifID: this.selectedItem["ID"],
      BarkodID: 0,
      IndirimTipi: 0,
      IndirimOranTutar: 0,
      OtvOrani: 0,
      OivOrani: 0,
      Aciklama: ""
    });
  }

  calculateSum() {
    let updatedDatas = this.detailGrid.instance.getDataSource()._items;
    let tempData = [];
    this.totalDiscount = 0;
    this.totalOiv = 0;
    this.totalOtv = 0;
    updatedDatas.forEach(item => {
      let araToplam = item.Miktar * item.BirimFiyat;
      let indirim = item.IndirimTipi == 0 ? ((araToplam / 100) * item.IndirimOranTutar) : item.IndirimOranTutar;
      let oiv = ((araToplam - indirim) / 100) * item.OivOrani;
      let otvMatrahi = (araToplam - indirim) + (((araToplam - indirim) / 100) * item.VergiOran) + oiv;
      let otv = otvMatrahi / 100 * item.OtvOrani;
      item.Tutar = (araToplam - indirim + otv) + (((araToplam - indirim) / 100) * item.VergiOran) + oiv;
      this.totalDiscount += indirim;
      this.totalOiv += oiv;
      this.totalOtv += otv;
      tempData.push(item);
    });
    this.dataSource2 = tempData;
  }

  valueChange(e, value) {
    this.products.forEach(item => {
      if (item.ID == value) {
        this.dataSource2[this.selectedRow].StokID = value;
        this.dataSource2[this.selectedRow].BirimFiyat = item.SatisFiyati;
        this.dataSource2[this.selectedRow].Birim = item.Birim1Adi;
        this.dataSource2[this.selectedRow].VergiOran = item.SatisKdvOrani;
      }
    });
    this["calculateSum"]();
  }

  onClickCell(e) {
    this.selectedRow = e.rowIndex;
  }

  constructor(private main: MainService) {
    this.valueChange = this.valueChange.bind(this);
    this.calculateSum = this.calculateSum.bind(this);
  }

  ngOnInit(): void {
    this.getList();
  }
}
