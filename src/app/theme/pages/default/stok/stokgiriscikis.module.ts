import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { StokGirisCikisComponent } from './stokgiriscikis.component';
import { FormsModule } from '@angular/forms';
import { DxDateBoxModule, DxSelectBoxModule,DxTextBoxModule, DxTextAreaModule } from 'devextreme-angular';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": StokGirisCikisComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,FormsModule,DxDateBoxModule,DxSelectBoxModule,DxTextBoxModule,DxTextAreaModule
    ], exports: [
        RouterModule
    ], declarations: [
        StokGirisCikisComponent
    ]
})
export class StokGirisCikisModule {


}