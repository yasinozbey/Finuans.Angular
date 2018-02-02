import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { MaasPrimComponent } from './maasprim.component';
import { FormsModule } from '@angular/forms';
import { DxDateBoxModule, DxSelectBoxModule,DxTextBoxModule } from 'devextreme-angular';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": MaasPrimComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,FormsModule,DxDateBoxModule,DxSelectBoxModule,DxTextBoxModule
    ], exports: [
        RouterModule
    ], declarations: [
        MaasPrimComponent
    ]
})
export class MaasPrimModule {


}