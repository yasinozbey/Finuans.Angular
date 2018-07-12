import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finuanspos',
  templateUrl: './finuanspos.component.html',
  styleUrls: ['./finuanspos.component.css']
})
export class FinuansposComponent implements OnInit {

  selectedItem = 0;
  textIndex = 0;
  edit = false;
  firstAction = true;
  actionItem;
  popupText;
  popupVisible = false;
  pendingAction;
  pendingList = [];
  pendingItemsPopup = false;
  pendingItemDetail;
  selectedtedPendingItem;
  dataSource = [
    {
      "Miktar": "1",
      "MiktarTip": "Adet",
      "Urun": "Ülker Çikolatalı Gofret",
      "KDV": "%18",
      "Fiyat": "2.5"
    },
    {
      "Miktar": "2",
      "MiktarTip": "Adet",
      "Urun": "Ülker Çikolatalı Gofret",
      "KDV": "%18",
      "Fiyat": "2.5"
    }
  ];
  smartItems = [
    {
      "Name": "Manav", "Elements": [
        { "Urun": "Ülker Çikolatalı Gofret", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet"},
        { "Urun": "Ülker Çikolatalı Gofret1", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret2", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret3", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret4", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret5", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret6", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret7", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret8", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret9", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
        { "Urun": "Ülker Çikolatalı Gofret10", "Barkod": "TR132456789", "Fiyat": "2.5", "KDV": "%18", "Miktar": "1", "MiktarTip": "Adet" },
      ]
    },
    { "Name": "Manav2", "Elements": [] }
  ]

  customizePriceText(e) {
    return e.value + " TL";
  }

  continueAction() {
    this.pendingAction.call();
  }

  onRowClick(e) {
    this.selectedItem = e.rowIndex;
    this.actionItem = e.data;
    this.firstAction = true;
    this.edit = true;
  }

  moveUp() {
    this.dataSource.splice(this.selectedItem - 1, 0, this.dataSource.splice(this.selectedItem, 1)[0]);
  }

  moveDown() {
    this.dataSource.splice(this.selectedItem + 1, 0, this.dataSource.splice(this.selectedItem, 1)[0]);
  }

  cancelDoc() {
    this.popupText = "Belgeyi iptal ediyorsunuz. Onaylıyor musunuz?";
    this.popupVisible = true;
    this.pendingAction = () => {
      this.dataSource = [];
      this.popupVisible = false;
    };
  }

  addToPendings() {
    this.popupText = "Belgeyi askıya alıyorsunuz. Onaylıyor musunuz?";
    this.popupVisible = true;
    this.pendingAction = () => {
      const temp = {Name: new Date().toISOString().substring(0, 10), Data: this.dataSource }
      this.pendingList.push(temp);
      this.actionItem = undefined;
      this.edit = false;
      this.firstAction = false;
      this.dataSource = [];
      this.popupVisible = false;
    };
  }

  showPendings() {
    this.pendingItemsPopup = true;
  }

  continueFromPending() {
    this.dataSource = this.pendingList[this.selectedtedPendingItem].Data;
    this.pendingList.splice(this.selectedtedPendingItem, 1);
    this.selectedtedPendingItem = undefined;
    this.pendingItemDetail = undefined;
    this.pendingItemsPopup = false;
  }

  removeRow() {
    this.popupText = "Seçili satırı siliyorsunuz. Onaylıyor musunuz?";
    this.popupVisible = true;
    this.pendingAction = () => {
      this.dataSource.splice(this.selectedItem, 1);
      this.popupVisible = false;
    };
  }

  addItem(e) {
    this.actionItem = e;
    this.edit = false;
    this.firstAction = true;
  }

  multiply(e) {
    if (this.firstAction) {
      this.actionItem.Miktar = e.toString();
    } else {
      this.actionItem.Miktar += e.toString();
    }
    this.firstAction = false;
  }

  acceptItem() {
    if (!this.edit) {
      this.dataSource.push(this.actionItem);
      this.actionItem = undefined;
    }
  }

  closePOS() {
    localStorage.setItem("POSActivated", "false");
  }

  constructor() { }

  ngOnInit() {
  }

}
