import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { CalisanListComponent } from './calisanliste.component';
import { DxDataGridModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CalisanListComponent
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
        CalisanListComponent
    ]
})
export class CalisanListModule {

}