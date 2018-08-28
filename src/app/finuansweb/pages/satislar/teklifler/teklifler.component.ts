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
    { dataField: 'ID', caption: 'ID', alignment: 'left' },
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

  //FUTURE DEVELOPMENT
  // selectboxHandler = this.main.selectboxHandler.bind({component:this, selectboxes: {
  //   "carihesap": "customers",
  //   "doviz": "currencies",
  //   "stokhizmet": "products",
  // }})

  selectboxHandler() {
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

  getList() {
    this.main.reqGet("Teklif/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
  }

  handleGridAction(e) {
    this.main.reqGet("Teklif/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.main.reqGet("Teklif/GetDetail?teklifID=" + e.data.ID).subscribe(x => {
        this.dataSource2 = x;
        this.state = 1;
        this.main.reqGet("CariHesap/List").subscribe(res => {
          this.customers = res;
        });
        this.main.reqGet("Doviz/Get").subscribe(res => {
          this.currencies = res;
        });
        this.main.reqGet("StokHizmet/Get").subscribe(res => {
          this.products = res;
        });
      })
    });
  }

  handleNewAction(e) {
    this.selectedItem = undefined;
    this.state = 2;
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

  cancelForm() {
    this.state = 0;
    this.selectedItem = new Object();
  }

  saveForm(form) {
    if (!form.instance.validate()["isValid"]) {
      this.main.notifier("Lütfen zorunlu alanları doldurun.", false);
      return false;
    }
    if (this.dataSource2.length < 1) {
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
    form.formData["AraToplam"] = AraToplam;
    form.formData["KdvToplam"] = KDVToplam;
    form.formData["IndirimToplam"] = this.totalDiscount;
    form.formData["OivTutari"] = this.totalOiv;
    form.formData["OtvTutari"] = this.totalOtv;
    form.formData["DovizCinsi"] = 1;
    form.formData["DovizKuru"] = 1;
    form.formData["GenelToplam"] = GenelToplam;

    let reqData = {
      Teklif: form.formData,
      Detay: this.dataSource2
    }
    this.main.reqPost("Teklif/SaveTeklif", reqData).subscribe(res => {
      this.main.notifier("Teklif başarıyla kaydedildi", true)
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

  productChange(e, value) {
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

  miktarChange(e, value) {
    this.dataSource2[this.selectedRow].Miktar = value;
    this["calculateSum"]();
  }

  fiyatChange(e, value) {
    this.dataSource2[this.selectedRow].BirimFiyat = value;
    this["calculateSum"]();
  }

  vergiOranChange(e, value) {
    this.dataSource2[this.selectedRow].VergiOran = value;
    this["calculateSum"]();
  }

  onClickCell(e) {
    this.selectedRow = e.rowIndex;
  }

  constructor(private main: MainService) {
    this.productChange = this.productChange.bind(this);
    this.miktarChange = this.miktarChange.bind(this);
    this.fiyatChange = this.fiyatChange.bind(this);
    this.vergiOranChange = this.vergiOranChange.bind(this);
    this.calculateSum = this.calculateSum.bind(this);
  }

  ngOnInit(): void {
    this.getList();
  }
}
