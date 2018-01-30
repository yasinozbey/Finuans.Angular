import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'yeni-kasa',
    templateUrl: './yenikasa.component.html',
    styles: [":host{width:100%}"],
})
export class YeniKasaComponent implements OnInit {
    AcilisTarihi: any;
    SelectedDoviz: string;
    HesapAdi: string;
    AcilisBakiyesi: number;

    DovizList: string[] = [
        "TRL",
        "USD",
        "EURO",
    ];
    returnUrl: any;
    constructor(private route: ActivatedRoute, private r: Router) {
        //this.AcilisTarihi
        this.route.params.subscribe(params => {
            this.returnUrl = params['id'];
            console.log(params);
            
            console.log(this.returnUrl);
            
        });
    }


    Kaydet() {
        console.log(this.AcilisTarihi);
        console.log(this.SelectedDoviz);
        console.log(this.HesapAdi);
        console.log(this.AcilisBakiyesi);
    }

    Sil() {
        this.r.navigate(['/liste/kasa']);
    }

    ngOnInit() {

        this.AcilisTarihi = new Date();
    }
}