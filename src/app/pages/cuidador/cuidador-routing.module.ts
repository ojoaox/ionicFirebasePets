import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuidadorPage } from './cuidador.page';

const routes: Routes = [
  {
    path: '',
    component: CuidadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuidadorPageRoutingModule {}
