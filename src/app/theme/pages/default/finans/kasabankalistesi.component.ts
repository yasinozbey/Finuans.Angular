import { Component, OnInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { KasaBankaListesiService } from './kasabankalistesi.service';
import {ViewEncapsulation} from '@angular/core';


@Component({
    selector: 'kasabanka-list',
    templateUrl: './kasabankalistesi.component.html',
    styles: [":host{width:100%};", 
    "#kasabankalistesi [aria-label=Column Title, Filter cell]{border:none !important};",
    "#kasabankalistesi .dx-row.dx-column-lines.dx-datagrid-filter-row{background:white };",
    "#kasabankalistesi { height: 70vh;};", 
    "#kasabankalistesiholder {padding-bottom:20px}"],
    providers: [KasaBankaListesiService],
    encapsulation: ViewEncapsulation.None
})
export class KasaBankaListesiComponent implements OnInit {
    constructor(private svc: KasaBankaListesiService) { }
    data: any;
    KasaGirisEkleVisible:boolean=false;
    KasaCikisEkleVisible:boolean=false;

    ngOnInit() {
        this.svc.get().subscribe(x => this.data = x);
    }

    lastRowCLickedId: number;
    lastRowClickedTime: Date;
    imagePath: any;
    rowClick(e) {
        var currentTime = new Date();
        if (e.rowIndex === this.lastRowCLickedId && ((currentTime.getTime() - this.lastRowClickedTime.getTime()) < 300)) {
            this.imagePath = e.data.data;
            console.log(e.data);
        } else {
            this.lastRowCLickedId = e.rowIndex;
            this.lastRowClickedTime = new Date();
            console.log(e.data);
        }
    }
}