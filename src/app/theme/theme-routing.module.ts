import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "index",
                "loadChildren": ".\/pages\/aside-left-display-disabled\/index\/index.module#IndexModule"
            },
            {
                "path": "inner",
                "loadChildren": ".\/pages\/default\/inner\/inner.module#InnerModule"
            },
            {
                "path": "profile",
                "loadChildren": ".\/pages\/default\/profile\/profile.module#ProfileModule"
            },
            {
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "finans-liste/:id",
                "loadChildren": ".\/pages\/default\/finans\/kasalistesi.module#KasaListesiModule"
            },
            {
                "path": "stok-liste/:id",
                "loadChildren": ".\/pages\/default\/stok\/stokhizmetliste.module#StokHizmetListModule"
            },
            {
                "path": "yenistok",
                "loadChildren": ".\/pages\/default\/stok\/yenistok.module#YeniStokModule"
            },
            {
                "path": "yenikasa",
                "loadChildren": ".\/pages\/default\/finans\/yenikasa.module#YeniKasaModule"
            },
            {
                "path": "yenibanka",
                "loadChildren": ".\/pages\/default\/finans\/yenibanka.module#YeniBankaModule"
            },
            {
                "path": "stokhareket/:id",
                "loadChildren": ".\/pages\/default\/stok\/stokgiriscikis.module#StokGirisCikisModule"
            },
            {
                "path": "cari/:id",
                "loadChildren": ".\/pages\/default\/satis\/cari.module#CariModule"
            },
            {
                "path": "calisan/:id",
                "loadChildren": ".\/pages\/default\/giderler\/calisan.module#CalisanModule"
            },
            {
                "path": "maasprim/:id",
                "loadChildren": ".\/pages\/default\/giderler\/maasprim.module#MaasPrimModule"
            },
            {
                "path": "vergisgk/:id",
                "loadChildren": ".\/pages\/default\/giderler\/vergisgk.module#VergiSgkModule"
            },
            {
                "path": "bankagideri/:id",
                "loadChildren": ".\/pages\/default\/giderler\/bankagideri.module#BankaGideriModule"
            },
            {
                "path": "cari-liste/:id",
                "loadChildren": ".\/pages\/default\/satis\/cariliste.module#CariListModule"
            },
            {
                "path": "gider-liste",
                "loadChildren": ".\/pages\/default\/giderler\/giderliste.module#GiderListModule"
            },
            {
                "path": "calisan-liste",
                "loadChildren": ".\/pages\/default\/giderler\/calisanliste.module#CalisanListModule"
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }