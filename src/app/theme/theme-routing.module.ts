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
                "loadChildren": ".\/pages\/default\/stok\/stokhizmetliste.module#StokHizmetListeModule"
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
                "loadChildren": ".\/pages\/default\/satis\/calisan.module#CalisanModule"
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