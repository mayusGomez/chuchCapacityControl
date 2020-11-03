import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramarPageRoutingModule } from './programar-routing.module';

import { ProgramarPage } from './programar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProgramarPageRoutingModule
  ],
  declarations: [ProgramarPage]
})
export class ProgramarPageModule {}
