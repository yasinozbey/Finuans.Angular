import { Component, OnInit, OnDestroy } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { GiderListService } from './giderliste.service';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'gider-list',
    templateUrl: 'giderliste.component.html',
    providers: [GiderListService],
    styles: [":host{width:100%};",
        "#kasabankalistesi [aria-label=Column Title, Filter cell]{border:none !important};",
        "#kasabankalistesi .dx-row.dx-column-lines.dx-datagrid-filter-row{background:white };",
        "#kasabankalistesi { height: 100%;};",
        "#kasabankalistesiholder {padding-bottom:0px}"],
})

export class GiderListComponent implements OnInit, OnDestroy  {
    constructor(private svc: GiderListService) { }
    data: any;

    ngOnInit() {
    }

    ngOnDestroy() {
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