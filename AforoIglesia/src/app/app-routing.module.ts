import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'locations',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/auth/auth-page.module').then( m => m.AuthPagePageModule)
  },
  {
    path: 'signup-page',
    loadChildren: () => import('./pages/signup/signup-page.module').then( m => m.SignupPagePageModule)
  },
  {
    path: 'programar/:document_code',
    loadChildren: () => import('./pages/programar/programar.module').then( m => m.ProgramarPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./pages/reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'locations',
    loadChildren: () => import('./pages/locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
