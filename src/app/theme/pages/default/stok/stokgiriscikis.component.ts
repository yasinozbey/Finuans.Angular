import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'stok-giriscikis',
    templateUrl: './stokgiriscikis.component.html',
    styles: [":host{width:100%}"],
})
export class StokGirisCikisComponent implements OnInit {
    AcilisTarihi:any;
    SelectedKategori:string;
    HesapAdi:string;
    AcilisBakiyesi:number;
    EvrakTipi:string;
    Title:string;
    private sub: any;

    KategoriList: string[] = [
        "Stok Kategorisi 1",
        "Stok Kategorisi 2",
        "Stok Kategorisi 3",
    ];

    constructor(private r: Router, private route: ActivatedRoute) { 
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
        this.sub = this.route.params.subscribe(params => {
            this.EvrakTipi = params['id'];

            if (this.EvrakTipi == "giris") {
                this.Title = "Stok Giriş";
                //this.svc.get().subscribe(x => this.data = x);
            }
            else {
                this.Title = "Stok Çıkış";
            }
        });
     }
}