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
    { actionEvent: "AVANS", actionName: "Yeni Avans" },
    { actionEvent: "VERGI", actionName: "Yeni Vergi/SGK Primi" },
    { actionEvent: "BANKA", actionName: "Yeni Banka Gideri" },
  ]
  info;
  categories;
  currencies;
  accounts;
  accountsFiltered;
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
  customers;
  selectedRow = 0;
  totalDiscount = 0;
  totalOiv = 0;
  totalOtv = 0;
  defaultDate = new Date();
  defaultDoviz;
  odemeDurumuState = 0;

  getList() {
    this.main.reqGet("Gider/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
    this.main.reqGet("Doviz/Get").subscribe(resDoviz => {
      this.currencies = resDoviz;
      this.defaultDoviz = this.currencies.filter(x => {
        if (x.Kod == "TL") {
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
    this.main.reqGet("CariHesap/List").subscribe(res => {
      this.customers = res;
    })
  }

  handleGridAction(e) {
    if(e.data.Tip === 4) {
      this.stateType = "FIS";
      this.main.reqGet("Fatura/GetbyId/" + e.data.ID).subscribe(res => {
        debugger;
        if (res.OdemeDurumu) {
          this.selectedItem = {};
          this.main.reqGet("CariHesapHareket/GetbyId/" + res.TahsilatID).subscribe(resPayments => {
            this.selectedItem["Tahsilat"] = resPayments;
            Object.assign(this.selectedItem, res);
          });
        } else {
          this.selectedItem = res;
        }
        this.odemeDurumuState = res.OdemeDurumu;
        this.state = 1;
      });
      this.main.reqGet("Fatura/GetDetail?faturaID=" + e.data.ID).subscribe(res => {
        this.dataSource2 = res;
      });
    } else{
      if (e.data.Tip === 0) {
        this.stateType = "MAAS";
      } else if (e.data.Tip === 1) {
        this.stateType = "VERGI";
      } else if (e.data.Tip === 2) {
        this.stateType = "BANKA";
      } else if (e.data.Tip === 3) {
        this.stateType = "AVANS";
      }
      this.main.reqGet("Gider/GetbyId/" + e.data.ID).subscribe(res => {
        this.selectedItem = res;
        this.getAccountsFiltered();
        this.state = 1;
      });
    }
  }

  handleNewAction(e) {
    this.selectedItem = {
      OdemeDurumu: 0,
      VadeTarihi:this.defaultDate,
      BelgeTarihi:this.defaultDate,
    };
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
    if (this.stateType == 'FIS') {
      this.faturaInsert(form);
    } else {
      let url;
      if (this.selectedItem.ID) {
        url = "Gider/Update";
      } else {
        url = "Gider/Insert";
      }
      this.main.reqPost(url, form.formData).subscribe(res => {
        this.getList();
      });
    }
  }

  faturaInsert(form) {
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
    form.formData["FaturaTipi"] = 1;
    
    let reqData = {
      Fatura: form.formData,
      Detay: this.dataSource2,
      HesapID: form.formData.OdemeDurumu ? this.selectedItem["Tahsilat"].HesapID : 0,
      IsKasa: form.formData.OdemeDurumu ? this.accounts.filter(x => {return this.selectedItem["Tahsilat"].HesapID == x.ID})[0].IsKasa : false,
      TahsilatTarihi: form.formData.OdemeDurumu ? this.selectedItem["Tahsilat"].EvrakTarihi : new Date()
    }
    this.main.reqPost("Fatura/SaveFatura", reqData).subscribe(res => {
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

  getAccountsFiltered(val = undefined) {
    if(val){
      this.accountsFiltered = this.accounts.filter(x => {
        return x.IsKasa == val.value;
      })
    } else{
      this.accountsFiltered = this.accounts.filter(x => {
        return x.IsKasa == this.selectedItem.HesapTipi;
      })
    }
  }

  changeOdemeDurumu(e) {
    this.odemeDurumuState = e.value;
  }

  constructor(private main: MainService) {
    this.valueChange = this.valueChange.bind(this);
    this.calculateSum = this.calculateSum.bind(this);
    this.getAccountsFiltered = this.getAccountsFiltered.bind(this);
    this.changeOdemeDurumu = this.changeOdemeDurumu.bind(this);
  }

  ngOnInit(): void {
    this.getList();
  }
}
