import { Component, OnInit, OnDestroy } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { KasaListesiService } from './kasalistesi.service';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'kasa-list',
    templateUrl: './kasalistesi.component.html',
    styles: [":host{width:100%};",
        "#kasabankalistesi [aria-label=Column Title, Filter cell]{border:none !important};",
        "#kasabankalistesi .dx-row.dx-column-lines.dx-datagrid-filter-row{background:white };",
        "#kasabankalistesi { height: 100%;};",
        "#kasabankalistesiholder {padding-bottom:0px}"],
    providers: [KasaListesiService],
    encapsulation: ViewEncapsulation.None
})
export class KasaListesiComponent implements OnInit, OnDestroy {
    constructor(private svc: KasaListesiService, private route: ActivatedRoute) { }

    data: any;
    KasaGCVisible: boolean = false;
    IslemCinsi: number = 0; // 0 kasa giriş 1 kasa çıkış 2 transfer
    IslemCinsiText: string;
    Title: string;
    ListeTipi: string;
    private sub: any;
    KasaList: string[] = [
        "TL Kasası",
        "USD Kasası",
        "EURO Kasası",
    ];
    BankaList: string[] = [
        "Akbank",
        "Garanti",
        "İş Bankası",
    ];

    SelectedBanka: string;
    SelectedKasa: string;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.ListeTipi = params['id'];

            if (this.ListeTipi == "kasa") {
                this.Title = "Kasa Listesi";
                this.svc.get().subscribe(x => this.data = x);
            }
            else {
                this.Title = "Banka Listesi";
                this.data = null;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    TransferVisible(state: boolean, tip: number) {
        this.KasaGCVisible = state;
        this.IslemCinsi = tip;
        if (tip == 0)
            this.IslemCinsiText = "Para Girişi";
        else if (tip == 1)
            this.IslemCinsiText = "Para Çıkışı";
        else if (tip == 2)
            this.IslemCinsiText = "Transfer";

            // ?returnURL=liste/kasa
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