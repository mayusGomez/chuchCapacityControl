import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPagePageRoutingModule } from './signup-page-routing.module';

import { SignupPagePage } from './signup-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPagePageRoutingModule
  ],
  declarations: [SignupPagePage]
})
export class SignupPagePageModule {}
