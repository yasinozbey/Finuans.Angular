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
    { dataField: 'ID', caption: 'ID', alignment: 'left'},
    { dataField: "Aciklama", caption: "Açıklama" },
    { dataField: "HesapAdi", caption: "Hesap Adı" },
    { dataField: "Fatura", caption: "Fatura" },
    { dataField: "DuzenlenmeTarihi", caption: "Düzenleme Tarihi", dataType: "date", format: 'dd.MM.y' },
    { dataField: "TeklifTutari", caption: "Teklif Tutarı", format: '#0.00', alignment: 'right' },
  ];
  actions = [
    { actionEvent: "new", actionName: "Yeni Teklif" }
  ]
  info;
  customers;
  currencies;
  selectedItem;
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
  ]
  discountTypes = [
    { ID: 0, Name: "Oran (%)" },
    { ID: 1, Name: "Tutar" }
  ]
  defaultDate = new Date();

  getList() {
    this.main.reqGet("Teklif/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
    this.main.reqGet("CariHesap/List").subscribe(res => {
      this.customers = res;
    })
    this.main.reqGet("Doviz/Get").subscribe(res => {
      this.currencies = res;
    });
    this.main.reqGet("StokHizmet/Get").subscribe(res => {
      this.products = res;
    });
  }

  handleGridAction(e) {
    this.main.reqGet("Teklif/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.main.reqGet("Teklif/GetDetail?teklifID=" + e.data.ID).subscribe(x => {
        this.dataSource2 = x;
        this.state = 1;
      })
    });
  }

  handleNewAction(e) {
    this.selectedItem = undefined;
    this.state = 1;
  }

  cancelForm() {
    this.state = 0;
    this.selectedItem = new Object();
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
    this.main.reqPost("Teklif/SaveTeklif", reqData).subscribe(res => {
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
      TeklifID: this.selectedItem ? this.selectedItem.ID : 0,
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
