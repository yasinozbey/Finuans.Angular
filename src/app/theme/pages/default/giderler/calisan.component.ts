import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'calisan-kart',
    templateUrl: './calisan.component.html',
    styles: [":host{width:100%}"],
})
export class CalisanComponent implements OnInit {
    AcilisTarihi:any;
    SelectedDoviz:string;
    HesapAdi:string;
    AcilisBakiyesi:number;

    DovizList: string[] = [
        "TRL",
        "USD",
        "EURO",
    ];

    constructor(private r: Router) { 
        //this.AcilisTarihi
    }
    

    Kaydet()
    {
        console.log(this.AcilisTarihi);
        console.log(this.SelectedDoviz);
        console.log(this.HesapAdi);
        console.log(this.AcilisBakiyesi);
    }

    Vazgec()
    {
        this.r.navigate(['/calisan-liste']);
    }

    ngOnInit() {
        this.AcilisTarihi = new Date();
     }
}