import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule
  ]
})
export class AdminModule { }
