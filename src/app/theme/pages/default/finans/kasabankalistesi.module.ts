import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { KasaBankaListesiComponent } from './kasabankalistesi.component';
import { DxDataGridModule } from 'devextreme-angular';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": KasaBankaListesiComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, DxDataGridModule
    ], exports: [
        RouterModule
    ], declarations: [
        KasaBankaListesiComponent
    ]
})
export class KasaBankaListesiModule {


}