import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ProgramarPage } from './programar.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramarPage
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ProgramarPageRoutingModule {}
