import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-tahsilatlar-raporu',
  templateUrl: './tahsilatlar-raporu.component.html',
  styleUrls: [],
})
export class TahsilatlarRaporuComponent implements OnInit {
  dataSource;
  state = 0;

  getList() {
    this.main.reqGet("Rapor/TahsilatRaporu?baslangicTarihi=2018-01-01&bitisTarihi=2018-12-31").subscribe(res => {
      this.dataSource = res;
    });
  }
  
  constructor(private main: MainService) { }

  ngOnInit() {
    this.getList();
  }
}
