import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'yeni-stok',
    templateUrl: './yenistok.component.html',
    styles: [":host{width:100%}"],
})
export class YeniStokComponent implements OnInit {
    AcilisTarihi:any;
    SelectedKategori:string;
    HesapAdi:string;
    AcilisBakiyesi:number;

    KategoriList: string[] = [
        "Stok Kategorisi 1",
        "Stok Kategorisi 2",
        "Stok Kategorisi 3",
    ];

    constructor(private r: Router) { 
        //this.AcilisTarihi
    }
    

    Kaydet()
    {
        console.log(this.AcilisTarihi);
        console.log(this.SelectedKategori);
        console.log(this.HesapAdi);
        console.log(this.AcilisBakiyesi);
    }

    Vazgec()
    {
        this.r.navigate(['/stok-liste/stok']);
    }

    ngOnInit() {
        this.AcilisTarihi = new Date();
     }
}