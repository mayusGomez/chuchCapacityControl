import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPagePageRoutingModule } from './auth-page-routing.module';

import { AuthPagePage } from './auth-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    IonicModule,
    AuthPagePageRoutingModule
  ],
  declarations: [AuthPagePage]
})
export class AuthPagePageModule {}
