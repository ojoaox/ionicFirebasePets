import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'page-detail',
    loadChildren: () => import('./pages/page-detail/page-detail.module').then( m => m.PageDetailPageModule)
  },
  {
    path: 'page-detail/:id',
    loadChildren: () => import('./pages/page-detail/page-detail.module').then( m => m.PageDetailPageModule)
  },
  {
    path: 'cuidador-detail',
    loadChildren: () => import('./pages/cuidador-detail/cuidador-detail.module').then( m => m.CuidadorDetailPageModule)
  },
  {
    path: 'cuidador-detail/:id',
    loadChildren: () => import('./pages/cuidador-detail/cuidador-detail.module').then( m => m.CuidadorDetailPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
