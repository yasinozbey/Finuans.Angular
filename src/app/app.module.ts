import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  DxSelectBoxModule, DxTextAreaModule, DxDateBoxModule, DxFormModule, DxPopupModule,
  DxDataGridModule, DxBulletModule, DxTemplateModule, DxPieChartModule, DxTabPanelModule
} from 'devextreme-angular';

import { AppComponent } from './app.component';
import { FinuanswebComponent } from './finuansweb/finuansweb.component';
import { FinuansposComponent } from './finuanspos/finuanspos.component';
import { MenuComponent } from './finuansweb/menu/menu.component';
import { GuncelDurumComponent } from './finuansweb/pages/guncel-durum/guncel-durum.component';
import { TekliflerComponent } from './finuansweb/pages/satislar/teklifler/teklifler.component';
import { FaturalarComponent } from './finuansweb/pages/satislar/faturalar/faturalar.component';
import { MusterilerComponent } from './finuansweb/pages/satislar/musteriler/musteriler.component';
import { SatislarRaporuComponent } from './finuansweb/pages/satislar/satislar-raporu/satislar-raporu.component';
import { TahsilatlarRaporuComponent } from './finuansweb/pages/satislar/tahsilatlar-raporu/tahsilatlar-raporu.component';
import { GelirGiderRaporuComponent } from './finuansweb/pages/satislar/gelir-gider-raporu/gelir-gider-raporu.component';
import { GiderListesiComponent } from './finuansweb/pages/giderler/gider-listesi/gider-listesi.component';
import { TedarikcilerComponent } from './finuansweb/pages/giderler/tedarikciler/tedarikciler.component';
import { CalisanlarComponent } from './finuansweb/pages/giderler/calisanlar/calisanlar.component';
import { GiderlerRaporuComponent } from './finuansweb/pages/giderler/giderler-raporu/giderler-raporu.component';
import { OdemelerRaporuComponent } from './finuansweb/pages/giderler/odemeler-raporu/odemeler-raporu.component';
import { KdvRaporuComponent } from './finuansweb/pages/giderler/kdv-raporu/kdv-raporu.component';
import { KasaVeBankalarComponent } from './finuansweb/pages/nakit/kasa-ve-bankalar/kasa-ve-bankalar.component';
import { CeklerComponent } from './finuansweb/pages/nakit/cekler/cekler.component';
import { KasaBankaRaporuComponent } from './finuansweb/pages/nakit/kasa-banka-raporu/kasa-banka-raporu.component';
import { NakitAkisiRaporuComponent } from './finuansweb/pages/nakit/nakit-akisi-raporu/nakit-akisi-raporu.component';
import { HizmetVeUrunlerComponent } from './finuansweb/pages/stok/hizmet-ve-urunler/hizmet-ve-urunler.component';
import { StokGecmisiComponent } from './finuansweb/pages/stok/stok-gecmisi/stok-gecmisi.component';
import { StoktakiUrunlerRaporuComponent } from './finuansweb/pages/stok/stoktaki-urunler-raporu/stoktaki-urunler-raporu.component';
import { FnGridComponent } from './finuansweb/layout-helpers/fn-grid/fn-grid.component';

const appRoutes: Routes = [
  { path: 'GuncelDurum', component: GuncelDurumComponent },
  { path: 'Teklifler', component: TekliflerComponent },
  { path: 'Faturalar', component: FaturalarComponent },
  { path: 'Musteriler', component: MusterilerComponent },
  { path: 'SatislarRaporu', component: SatislarRaporuComponent },
  { path: 'TahsilatlarRaporu', component: TahsilatlarRaporuComponent },
  { path: 'GelirGiderRaporu', component: GelirGiderRaporuComponent },
  { path: 'GiderListesi', component: GiderListesiComponent },
  { path: 'Tedarikciler', component: TedarikcilerComponent },
  { path: 'Calisanlar', component: CalisanlarComponent },
  { path: 'GiderlerRaporu', component: GiderlerRaporuComponent },
  { path: 'OdemelerRaporu', component: OdemelerRaporuComponent },
  { path: 'KDVRaporu', component: KdvRaporuComponent },
  { path: 'KasaVeBankalar', component: KasaVeBankalarComponent },
  { path: 'Cekler', component: CeklerComponent },
  { path: 'KasaBankaRaporu', component: KasaBankaRaporuComponent },
  { path: 'NakitAkisiRaporu', component: NakitAkisiRaporuComponent },
  { path: 'HizmetVeUrunler', component: HizmetVeUrunlerComponent },
  { path: 'StokGecmisi', component: StokGecmisiComponent },
  { path: 'StoktakiUrunlerRaporu', component: StoktakiUrunlerRaporuComponent },
  { path: '', redirectTo: '/GuncelDurum', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FinuanswebComponent,
    FinuansposComponent,
    MenuComponent,
    GuncelDurumComponent,
    FaturalarComponent,
    MusterilerComponent,
    SatislarRaporuComponent,
    TahsilatlarRaporuComponent,
    GelirGiderRaporuComponent,
    TekliflerComponent,
    GiderListesiComponent,
    TedarikcilerComponent,
    CalisanlarComponent,
    GiderlerRaporuComponent,
    OdemelerRaporuComponent,
    KdvRaporuComponent,
    KasaVeBankalarComponent,
    CeklerComponent,
    KasaBankaRaporuComponent,
    NakitAkisiRaporuComponent,
    HizmetVeUrunlerComponent,
    StokGecmisiComponent,
    StoktakiUrunlerRaporuComponent,
    FnGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DxSelectBoxModule, DxTextAreaModule, DxDateBoxModule, DxFormModule, DxDataGridModule, DxBulletModule, DxTemplateModule, DxPieChartModule, DxPopupModule, DxTabPanelModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
