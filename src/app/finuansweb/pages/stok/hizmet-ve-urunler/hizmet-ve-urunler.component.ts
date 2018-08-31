import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-hizmet-ve-urunler',
  templateUrl: './hizmet-ve-urunler.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class HizmetVeUrunlerComponent implements OnInit {

  dataSource = [];
  dataSource2 = [];
  dataSource3 = [];
  dataFields = [
    { dataField: 'ID', caption: 'ID', alignment: 'left' },
    { dataField: "Adi", caption: "Adı" },
    { dataField: "Miktar", caption: "Miktar" },
    { dataField: "AlisFiyati", caption: "Alış Fiyatı" },
    { dataField: "SatisFiyati", caption: "Satış Fiyatı" },
  ];
  actions = [
    { actionEvent: "new", actionName: "Yeni Hizmet/Ürün" }
  ]
  taxes = [
    { Name: "0%", Value: 0 },
    { Name: "1%", Value: 1 },
    { Name: "8%", Value: 8 },
    { Name: "18%", Value: 18 },
  ]

  birimler = [
    { Name: "Adet", Value: 1 },
    { Name: "Koli", Value: 2 },
    { Name: "Paket", Value: 3 },
    { Name: "Gram", Value: 4 },
    { Name: "Kilogram", Value: 5 },
    { Name: "Metre", Value: 6 },
    { Name: "Gün", Value: 7 },
    { Name: "Hafta", Value: 8 },
    { Name: "Ay", Value: 9 },
    { Name: "Yıl", Value: 10 },
    { Name: "Palet", Value: 11 },
    { Name: "Kilometre", Value: 12 },
  ]
  categories;
  currencies;
  selectedItem;
  state = 0;
  info = false;
  selectedRow;
  columns = [
    { dataField: "IslemTuru", caption: "İşlem Türü" },
    { dataField: "MusteriTedarikciAdi", caption: "Müşteri Tedarikçi Adı" },
    { dataField: "IslemTarihi", caption: "İşlem Tarihi" },
    { dataField: "Miktar", caption: "Miktar" },
  ]

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
    this.main.reqGet("StokHizmet/GetBarkod/" + e.data.ID).subscribe(res => {
      this.dataSource2 = res
    });
    this.main.reqGet("StokHizmet/IslemGecmisi/" + e.data.ID).subscribe(resIslem => {
      debugger;
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
    let url = "StokHizmet/SaveStokHizmet";

    let isOK = true;
    let barkodArray = [];
    this.dataSource2.forEach(item => { barkodArray.push(item.Barkodu) });

    let reqKontrolData = {
      Barkodlar: barkodArray,
      StokID: form.formData.ID
    }
    this.main.reqPost("StokHizmet/BarkodKontrol", reqKontrolData).subscribe(res => {
      if (res) {
        this.main.notifier(res, false);
      } else {
        let reqData = {
          StokHizmet: form.formData,
          Barkodlar: this.dataSource2
        }
        this.main.reqPost(url, reqData).subscribe(res => {
          this.getList();
          this.state = 0;
        });
      }
    });
  }

  addRow() {
    if (this.dataSource2.length > 4) {
      this.main.notifier("En fazla 5 adet barkod ekleyebilirsiniz.", false);
    } else {
      this.dataSource2.push({
        Barkod: "",
        Birim: "",
        Miktar: 1,
        Fiyat: 1
      });
    }
  }

  selectboxHandler() {
    this.main.reqGet("Kategori/Get").subscribe(resKategori => {
      this.categories = resKategori;
    });
    this.main.reqGet("Doviz/Get").subscribe(resDoviz => {
      this.currencies = resDoviz;
    });
  }

  onClickCell(e) {
    this.selectedRow = e.rowIndex;
  }

  birimChange(e, value, item) {
    this.dataSource2[this.selectedRow].BirimNo = value;
  }

  constructor(private main: MainService) {
    this.birimChange = this.birimChange.bind(this);
  }

  ngOnInit(): void {
    this.getList();
  }
}
