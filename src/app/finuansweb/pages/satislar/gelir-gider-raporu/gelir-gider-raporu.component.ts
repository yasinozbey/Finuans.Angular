import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-gelir-gider-raporu',
  templateUrl: './gelir-gider-raporu.component.html',
  styleUrls: [],
})
export class GelirGiderRaporuComponent implements OnInit {
  dataSource;
  state = 0;

  getList() {
    this.main.reqGet("Rapor/GelirGiderRaporu?baslangicTarihi=2018-01-01&bitisTarihi=2018-12-31&KdvDahil=true").subscribe(res => {
      this.dataSource = res;
    });
  }
  
  constructor(private main: MainService) { }

  ngOnInit() {
    this.getList();
  }
}
