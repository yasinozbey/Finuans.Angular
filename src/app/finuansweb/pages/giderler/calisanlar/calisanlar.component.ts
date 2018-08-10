import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-calisanlar',
  templateUrl: './calisanlar.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class CalisanlarComponent implements OnInit {

  dataSource = [];
  dataFields = [
    { dataField: 'ID', caption: 'ID', alignment: 'left'},
    { dataField: "AdSoyad", caption: "Ad Soyad" },
    { dataField: "Bakiye", caption: "Bakiye", format: '#0.00', alignment: 'right' },
    { dataField: "Avans", caption: "Avans", format: '#0.00', alignment: 'right' },
    { dataField: "Odenecek", caption: "Ödenecek", format: '#0.00', alignment: 'right' },
  ];
  actions = [
    { actionEvent: "new", actionName: "Yeni Çalışan" }
  ]
  info;
  categories;
  selectedItem;
  state = 0;

  constructor(private main: MainService) { }

  getList() {
    this.main.reqGet("Calisan/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
  }

  handleGridAction(e) {
    this.main.reqGet("Calisan/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.state = 1;
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

  saveForm() {
    let url;
    if (this.state === 1) {
      url = "Calisan/Insert";
    } else {
      url = "Calisan/Update";
    }
    this.main.reqPost(url, this.selectedItem).subscribe(res => {
      if (this.state === 1) {
        this.main.notifier("Çalışan başarıyla eklendi", true);
      } else {
        this.main.notifier("Çalışan başarıyla güncellendi", true);
      }
      this.getList();
    });
  }

  ngOnInit(): void {
    this.getList();
    this.main.reqGet("Kategori/Get").subscribe(res => {
      this.categories = res;
    });
  }
}
