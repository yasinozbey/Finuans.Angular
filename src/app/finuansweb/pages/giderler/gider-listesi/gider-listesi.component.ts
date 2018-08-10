import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-gider-listesi',
  templateUrl: './gider-listesi.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class GiderListesiComponent implements OnInit {
  @ViewChild("detailGrid") detailGrid;
  dataSource = [];
  dataSource2 = [];
  dataFields = [
    { dataField: 'ID', caption: 'ID', alignment: 'left' },
    { dataField: "Aciklama", caption: "Açıklama" },
    { dataField: "HesapAdi", caption: "Hesap Adı" },
    { dataField: "DuzenlemeTarihi", caption: "Düzenleme Tarihi", dataType: "date", format: 'dd.MM.y' },
    { dataField: "Bakiye", caption: "Bakiye", format: '#0.00', alignment: 'right' },
    { dataField: "Odendi", caption: "Ödendi", format: '#0.00', alignment: 'right' },
    { dataField: "Odenecek", caption: "Ödenecek", format: '#0.00', alignment: 'right' }
  ];
  actions = [
    { actionEvent: "FIS", actionName: "Yeni Fiş/Fatura" },
    { actionEvent: "MAAS", actionName: "Yeni Maaş/Prim" },
    { actionEvent: "VERGI", actionName: "Yeni Vergi/SGK Primi" },
    { actionEvent: "BANKA", actionName: "Yeni Banka Gideri" },
  ]
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
  products;
  selectedRow = 0;
  totalDiscount = 0;
  totalOiv = 0;
  totalOtv = 0;
  defaultDate = new Date();
  defaultDoviz;

  getList() {
    this.main.reqGet("Gider/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
    this.main.reqGet("Doviz/Get").subscribe(resDoviz => {
      this.currencies = resDoviz;
      this.defaultDoviz = this.currencies.filter(x => {
        if(x.Kod == "TL") {
          return true;
        } else {
          return false;
        }
      })
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
    this.main.reqGet("StokHizmet/Get").subscribe(res => {
      this.products = res;
    });
  }

  handleGridAction(e) {
    if (e.data.Tip === 0) {
      this.stateType = "MAAS";
    } else if (e.data.Tip === 1) {
      this.stateType = "VERGI";
    } else if (e.data.Tip === 2) {
      this.stateType = "BANKA";
    } else if (e.data.Tip === 3) {
      this.stateType = "AVANS";
    } else if (e.data.Tip === 4) {
      this.stateType = "FIS";
      this.main.reqGet("Fatura/GetDetail?faturaID=" + e.data.ID).subscribe(res => {
        this.dataSource2 = res;
      });
    }
    this.main.reqGet("Gider/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.state = 1;
    });
  }

  handleNewAction(e) {
    this.selectedItem = undefined;
    this.stateType = e;
    this.state = 1;
  }

  cancelForm() {
    this.state = 0;
    this.selectedItem = undefined;
  }

  saveForm(form) {
    if (!form.instance.validate()["isValid"]) {
      this.main.notifier("Lütfen zorunlu alanları doldurun.", false);
      return false;
    }
    if (this.stateType == 'FIS' && !this.dataSource2) {
      this.main.notifier("Lütfen bir Hizmet/Ürün ekleyin.", false);
      return false;
    }
    if (this.stateType == 'FIS') {
      this.faturaInsert();
    } else {
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
  }

  faturaInsert() {
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
      TeklifID: this.selectedItem ? this.selectedItem["ID"] : 0,
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
