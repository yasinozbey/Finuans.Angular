import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { StokHizmetListComponent } from './stokhizmetliste.component';
import { DxDataGridModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": StokHizmetListComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, DxDataGridModule,FormsModule,DxDateBoxModule,DxTextBoxModule,DxSelectBoxModule
    ], exports: [
        RouterModule
    ], declarations: [
        StokHizmetListComponent
    ]
})
export class StokHizmetListeModule {


}