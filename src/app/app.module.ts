import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate  } from '@angular/router';
import { AuthGuardService as AuthGuard } from './shared/auth-gurad.service';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import {
  DxSelectBoxModule, DxTextAreaModule, DxDateBoxModule, DxFormModule, DxPopupModule,
  DxDataGridModule, DxBulletModule, DxTemplateModule, DxPieChartModule, DxTabPanelModule, DxTextBoxModule
} from 'devextreme-angular';

import { AppComponent } from './app.component';
import { locale } from 'devextreme/localization';
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
import { FnFormGridComponent } from './finuansweb/layout-helpers/fn-form-grid/fn-form-grid.component';
import { FnMainComponent } from './finuansweb/layout-helpers/fn-main/fn-main.component';
import { FnFormComponent } from './finuansweb/layout-helpers/fn-form/fn-form.component';
import { LoginComponent } from './login/login.component';
import { FnInfoComponent } from './finuansweb/layout-helpers/fn-info/fn-info.component';

const appRoutes: Routes = [
  { path: 'GuncelDurum', component: GuncelDurumComponent, canActivate: [AuthGuard]  },
  { path: 'Teklifler', component: TekliflerComponent, canActivate: [AuthGuard]  },
  { path: 'Faturalar', component: FaturalarComponent, canActivate: [AuthGuard]  },
  { path: 'Musteriler', component: MusterilerComponent, canActivate: [AuthGuard]  },
  { path: 'SatislarRaporu', component: SatislarRaporuComponent, canActivate: [AuthGuard]  },
  { path: 'TahsilatlarRaporu', component: TahsilatlarRaporuComponent, canActivate: [AuthGuard]  },
  { path: 'GelirGiderRaporu', component: GelirGiderRaporuComponent, canActivate: [AuthGuard]  },
  { path: 'GiderListesi', component: GiderListesiComponent, canActivate: [AuthGuard]  },
  { path: 'Tedarikciler', component: TedarikcilerComponent, canActivate: [AuthGuard]  },
  { path: 'Calisanlar', component: CalisanlarComponent, canActivate: [AuthGuard]  },
  { path: 'GiderlerRaporu', component: GiderlerRaporuComponent, canActivate: [AuthGuard]  },
  { path: 'OdemelerRaporu', component: OdemelerRaporuComponent, canActivate: [AuthGuard]  },
  { path: 'KDVRaporu', component: KdvRaporuComponent, canActivate: [AuthGuard]  },
  { path: 'KasaVeBankalar', component: KasaVeBankalarComponent, canActivate: [AuthGuard]  },
  { path: 'Cekler', component: CeklerComponent, canActivate: [AuthGuard]  },
  { path: 'KasaBankaRaporu', component: KasaBankaRaporuComponent, canActivate: [AuthGuard]  },
  { path: 'NakitAkisiRaporu', component: NakitAkisiRaporuComponent, canActivate: [AuthGuard]  },
  { path: 'HizmetVeUrunler', component: HizmetVeUrunlerComponent, canActivate: [AuthGuard]  },
  { path: 'StokGecmisi', component: StokGecmisiComponent, canActivate: [AuthGuard]  },
  { path: 'StoktakiUrunlerRaporu', component: StoktakiUrunlerRaporuComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/GuncelDurum', pathMatch: 'full', canActivate: [AuthGuard]  }
];

locale(navigator.language);
registerLocaleData(localeTr, 'tr');

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
    FnFormGridComponent,
    FnMainComponent,
    FnFormComponent,
    LoginComponent,
    FnInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DxSelectBoxModule, DxTextAreaModule, DxDateBoxModule, DxFormModule, DxDataGridModule, DxBulletModule, DxTemplateModule, DxPieChartModule, DxPopupModule, DxTabPanelModule,DxTextBoxModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
