import { Component, OnInit, OnDestroy } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { StokHizmetListService } from './stokhizmetliste.service';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'stokhizmet-list',
    templateUrl: 'stokhizmetliste.component.html',
    providers: [StokHizmetListService],
    styles: [":host{width:100%};",
        "#kasabankalistesi [aria-label=Column Title, Filter cell]{border:none !important};",
        "#kasabankalistesi .dx-row.dx-column-lines.dx-datagrid-filter-row{background:white };",
        "#kasabankalistesi { height: 100%;};",
        "#kasabankalistesiholder {padding-bottom:0px}"],
})

export class StokHizmetListComponent implements OnInit, OnDestroy  {
    constructor(private svc: StokHizmetListService, private route: ActivatedRoute) { }
    data: any;
    Title: string;
    ListeTipi: string;
    private sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.ListeTipi = params['id'];

            if (this.ListeTipi == "stok") {
                this.Title = "Stok Listesi";
                this.svc.get().subscribe(x => this.data = x);
            }
            else {
                this.Title = "Hizmet Listesi";
                this.data = null;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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