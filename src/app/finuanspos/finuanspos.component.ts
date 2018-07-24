import { Component, OnInit, ViewChild } from '@angular/core';
import { POSService } from "../finuanspos/pos.service";
import { $ } from '../../../node_modules/protractor';

@Component({
  selector: 'app-finuanspos',
  templateUrl: './finuanspos.component.html',
  styleUrls: ['./finuanspos.component.css'],
  providers: [POSService]
})
export class FinuansposComponent implements OnInit {
  @ViewChild("invoiceTable") invoiceTable;
  dataSource = [];
  tabs = [];
  smartItems = {};
  barkodValue = "";
  popupVisible = false;
  popupText = "";
  popupButton = true;
  neonLights = {};
  seekItem = false;
  selectedItemIndex = 0;
  pendingAction;
  itemsListPopup = false;
  filterValue = "";
  filterResult;
  filterSelectedItem;
  filterTitle = "";
  index = 0;
  currentCustomer;
  paymentTypes;
  pendingItemsPopup = false;
  pendingItems = [];
  pendingItemDetail;
  itemsState;
  subTotalPopup = false;
  summary = {
    Toplam: "0",
    Indirim: "0",
    AraToplam:"0",
    KDV:"0",
    GenelToplam: "0"
  };
  tempTotal;
  payments = [];
  paymentInputValue = "";

  getTabs() {
    this.service.reqGet("Pos/KategoriListesi").subscribe(x => {
      this.tabs = x;
      this.tabs.forEach(element => {
        this.service.reqGet("Pos/UrunListesi?kategoriID=" + element.ID).subscribe(resUrunler => {
          this.smartItems[element.ID] = resUrunler;
        });
      });
    });
  }

  math(e) {
    if (e == "*") {
      if (this.barkodValue.indexOf("*") < 0 && this.barkodValue.length > 0) {
        if (this.barkodValue) {
          this.barkodValue += "" + e;
        } else {
          this.barkodValue = e;
        }
      }
    } else {
      if (this.barkodValue) {
        this.barkodValue += "" + e;
      } else {
        this.barkodValue = e;
      }
    }
  }

  calculateAll(){
    this.summary = {
      Toplam: "0",
      Indirim: "0",
      AraToplam:"0",
      KDV:"0",
      GenelToplam: "0"
    };
    this.dataSource.forEach(item => {
      this.calculateSummary(item);
    });
  }

  calculateSummary(e){
    this.summary.Toplam = (parseFloat(this.summary.Toplam) + parseFloat(e.Tutar)).toFixed(2);
    let indirim = ((e.Tutar / 100) * (this.currentCustomer ? this.currentCustomer.IndirimOrani : 0)).toFixed(2);
    this.summary.Indirim = (parseFloat(this.summary.Indirim) + parseFloat(indirim)).toFixed(2);
    let KDV = (((e.Tutar - parseFloat(indirim)) * e.KDV) / (100 + e.KDV)).toFixed(2);
    this.summary.KDV = (parseFloat(this.summary.KDV) + parseFloat(KDV)).toFixed(2);
    let AraToplam = (e.Tutar - parseFloat(indirim) - parseFloat(KDV)).toFixed(2);
    this.summary.AraToplam = (parseFloat(this.summary.AraToplam) + parseFloat(AraToplam)).toFixed(2);
    this.summary.GenelToplam = (parseFloat(this.summary.GenelToplam) + (parseFloat(AraToplam) + parseFloat(KDV))).toFixed(2);
  }

  addSmartItem(e) {
    let indexOfStar = this.barkodValue.indexOf("*");
    this.barkodValue += "" + e.Barkod;
    let miktar = 1;
    if (indexOfStar > -1) {
      miktar = parseInt(this.barkodValue.substring(0, indexOfStar));
    }
    const tempItem = {
      Miktar: miktar,
      Urun: e.Adi,
      KDV: e.KdvOrani,
      Fiyat: e.Fiyat,
      Birim: e.BirimAdi,
      Tutar: (e.Fiyat * miktar),
      Barkod: e.Barkod
    };
    if (!this.seekItem) {
      this.dataSource.push(tempItem);
      setTimeout(() => {
        document.querySelector(".fn-grid .dx-datagrid-rowsview tbody > tr:nth-child(" + (this.dataSource.length) + ")").classList.add("fn-selected");
        this.selectedItemIndex = this.dataSource.length - 1;
        this.neonLights = this.dataSource[this.selectedItemIndex];
        this.calculateSummary(tempItem);
      }, 100);
    } else {
      this.seekItem = false;
      this.neonLights = tempItem;
    }
    this.barkodValue = "";
  }

  addBarkodItem() {
    if (this.barkodValue.length > 0) {
      let indexOfStar = this.barkodValue.indexOf("*");
      let barkod = this.barkodValue.substring(indexOfStar + 1);
      let miktar = 1;
      if (indexOfStar > -1) {
        miktar = parseInt(this.barkodValue.substring(0, indexOfStar));
      }
      this.service.reqGet("Pos/UrunBul?Barkod=" + barkod + "&musteriID=" + 0).subscribe(resItem => {
        const tempItem = {
          Miktar: miktar,
          Urun: resItem.Adi,
          KDV: resItem.KdvOrani,
          Fiyat: resItem.Fiyat, 
          Birim: resItem.BirimAdi,
          Tutar: (resItem.Fiyat * miktar),
          Barkod: barkod
        };
        if (!this.seekItem) {
          this.dataSource.push(tempItem);
          setTimeout(() => {
            document.querySelector(".fn-grid .dx-datagrid-rowsview tbody > tr:nth-child(" + (this.dataSource.length) + ")").classList.add("fn-selected");
            this.selectedItemIndex = this.dataSource.length - 1;
            this.neonLights = this.dataSource[this.selectedItemIndex];
            this.calculateSummary(tempItem);
          }, 100);
        } else {
          this.seekItem = false;
          this.neonLights = tempItem;
        }
        this.barkodValue = "";
      },
        error => {
          this.popupText = "Ürün Bulunamadı";
          this.popupButton = false;
          this.popupVisible = true;
          this.barkodValue = "";
          setTimeout(() => {
            this.popupVisible = false;
            this.popupText = "";
            this.popupButton = true;
          }, 2000)
        }, );
    }
  }

  removeLastCharFromBarkod() {
    this.barkodValue = this.barkodValue.slice(0, -1);
  }

  moveUp() {
    let oldSelected = document.querySelector(".fn-grid .dx-datagrid-rowsview tbody > tr.fn-selected");
    if (oldSelected) oldSelected.classList.remove("fn-selected");
    if (this.selectedItemIndex > 0) {
      this.selectedItemIndex--;
    }
    document.querySelector(".fn-grid .dx-datagrid-rowsview tbody > tr:nth-child(" + (this.selectedItemIndex + 1) + ")").classList.add("fn-selected");
    this.neonLights = this.dataSource[this.selectedItemIndex];
  }

  moveDown() {
    let oldSelected = document.querySelector(".fn-grid .dx-datagrid-rowsview tbody > tr.fn-selected");
    if (oldSelected) oldSelected.classList.remove("fn-selected");
    if (this.selectedItemIndex < this.dataSource.length) {
      this.selectedItemIndex++;
    }
    document.querySelector(".fn-grid .dx-datagrid-rowsview tbody > tr:nth-child(" + (this.selectedItemIndex + 1) + ")").classList.add("fn-selected");
    this.neonLights = this.dataSource[this.selectedItemIndex];
  }

  removeRow() {
    this.popupVisible = true;
    this.popupText = "Satırı iptal etmek istediğinize emin misiniz?";
    this.pendingAction = () => {
      this.dataSource.splice(this.selectedItemIndex, 1);
      if (this.selectedItemIndex > 0) {
        this.selectedItemIndex--;
        setTimeout(() => {
          document.querySelector(".fn-grid .dx-datagrid-rowsview tbody > tr:nth-child(" + (this.selectedItemIndex + 1) + ")").classList.add("fn-selected");
          this.neonLights = this.dataSource[this.selectedItemIndex];
          this.calculateAll();
        }, 100);
      }
      this.popupVisible = false;
      this.popupText = "";
    }
  }

  searchItems() {
    if (this.filterTitle == 'Ürün Listesi') {
      this.service.reqGet("Pos/UrunArama?urunAdi=" + this.filterValue).subscribe(res => {
        this.filterResult = res;
      })
    } else {
      this.service.reqGet("Pos/MusteriArama?adi=" + this.filterValue).subscribe(res => {
        this.filterResult = res;
      })
    }
  }

  selectItem(e) {
    this.index++;
    this.filterSelectedItem = e.data;
    setTimeout(() => {
      if (this.index == 2) {
        this.index = 0;
        this.handleFilter();
      } else {
        this.index = 0;
      }
    }, 300);
  }

  handleFilter() {
    if (this.filterTitle == 'Ürün Listesi') {
      if (this.filterSelectedItem) {
        if (this.barkodValue) {
          this.barkodValue += "" + this.filterSelectedItem.Barkod;
        } else {
          this.barkodValue = this.filterSelectedItem.Barkod;
        }
        this.addBarkodItem();
        this.itemsListPopup = false;
        this.filterSelectedItem = undefined;
        this.filterValue = "";
        this.filterResult = [];
      }
    } else {
      if (this.filterSelectedItem) {
        this.currentCustomer = Object.assign(this.filterSelectedItem);
        this.calculateAll();
        this.itemsListPopup = false;
        this.filterSelectedItem = undefined;
        this.filterValue = "";
        this.filterResult = [];
      }
    }
  }

  subtotal() {
    this.service.reqGet("Pos/OdemeTipleri").subscribe(resPaymentTypes => {
      this.paymentTypes = resPaymentTypes;
      this.subTotalPopup = true;
      this.tempTotal = Object.assign({}, this.summary);
    })
  }

  keyboardAction(e) {
    if (this.filterValue) {
      this.filterValue += "" + e;
    } else {
      this.filterValue = e;
    }
  }

  removeLastFilter() {
    this.filterValue = this.filterValue.slice(0, -1);
  }

  addToPendings() {
    if (this.dataSource.length > 0) {
      this.popupVisible = true;
      this.popupButton = true;
      this.popupText = "Fişi askıya almak istediğinize emin misiniz?";
      this.pendingAction = () => {
        this.popupVisible = false;
        this.popupText = "";
        let reqData = [];
        this.dataSource.forEach(item => {
          reqData.push({
            CariID: this.currentCustomer ? this.currentCustomer.ID : 0,
            Barkodu: item.Barkod,
            Miktar: item.Miktar
          })
        });
        this.service.reqPost("Pos/AskiyaAl", reqData).subscribe(x => {
          this.dataSource = [];
          this.barkodValue = "";
          this.neonLights = {};
          this.currentCustomer = undefined;
        });
      }
    } else {
      this.popupVisible = true;
      this.popupButton = false;
      this.popupText = "Fişi askıya almak için önce ürün eklemelisiniz."
      setTimeout(() => {
        this.popupVisible = false;
        this.popupButton = true;
        this.popupText = ""
      }, 3000);
    }
  }

  showItems(e) {
    this.itemsState = e;
    this.service.reqGet("Pos/" + e + "FisListesi").subscribe(x => {
      this.pendingItems = x;
      this.pendingItemsPopup = true;
    })
  }

  viewItemDetail(e) {
    if (this.itemsState == "Bekleyen") {
      this.service.reqGet("Pos/BekleyenGetir?referansNo=" + e).subscribe(x => {
        this.pendingItemDetail = x;
      })
    } else {
      this.service.reqGet("Pos/fisGetir?referansNo=" + e).subscribe(x => {
        this.pendingItemDetail = x;
      })
    }
  }

  continueFromPending() {
    this.dataSource = [];
    this.neonLights = undefined;
    this.currentCustomer = undefined;
    if (this.pendingItemDetail[0].CariHesapID > 0) {
      this.service.reqGet("Pos/MusteriBul/" + this.pendingItemDetail[0].CariHesapID).subscribe(x => {
        this.currentCustomer = x;
        this.pendingItemDetail.forEach(item => {
          this.barkodValue = item.Miktar + "*" + item.Barkodu;
          this.addBarkodItem();
        });
        this.pendingItemsPopup = false;
      })
    } else {
      this.pendingItemDetail.forEach(item => {
        this.barkodValue = item.Miktar + "*" + item.Barkodu;
        this.addBarkodItem();
      });
      this.pendingItemsPopup = false;
      this.pendingItemDetail = undefined;
    }
  }

  cancelDocument() {
    if (this.dataSource.length > 0) {
      this.popupVisible = true;
      this.popupButton = true;
      this.popupText = "Belgeyi iptal etmek istediğinizden emin misiniz?";
      this.pendingAction = () => {
        this.clearAll();
        // this.service.reqPost("Pos/BelgeIptal", ).subscribe(x => {
        //   debugger;
        //   this.popupVisible = false;
        //   this.popupText = "";
        // })
      }
    } else {
      this.popupButton = false;
      this.popupText = "Belgeye henüz başlamadınız!";
      this.popupVisible = true;
      setTimeout(() => {
        this.popupVisible = false;
        this.popupButton = true;
        this.popupText = "";
      }, 3000);
    }
  }

  repeatLastItem(){
    if(this.neonLights){
      this.barkodValue = this.neonLights["Miktar"] + "*" + this.neonLights["Barkod"];
      this.addBarkodItem();
    }
  }

  onBarkodChange(e){
    if(e){
      this.barkodValue = e.currentTarget.value;
    }
    this.addBarkodItem();
  }

  syncing(e){
    if(e){
      this.barkodValue = e.currentTarget.value;
    }
  }

  clearAll() {
    this.dataSource = [];
    this.neonLights = undefined;
    this.currentCustomer = undefined;
    this.popupVisible = false;
    this.popupText = "";
    this.summary = {
      Toplam: "0",
      Indirim: "0",
      AraToplam:"0",
      KDV:"0",
      GenelToplam: "0"
    };
  }

  closePOS() {
    localStorage.setItem("POSActivated", "false");
  }

  paymentInput(e) { 
    if (this.paymentInputValue) {
      this.paymentInputValue += "" + e;
    } else {
      this.paymentInputValue = e;
    }
  }

  removeLastCharFromPayment() {
    this.paymentInputValue = this.paymentInputValue.slice(0, -1);
  }

  constructor(private service: POSService) { }

  ngOnInit() {
    this.getTabs();
  }

}
