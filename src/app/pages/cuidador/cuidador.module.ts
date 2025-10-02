import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuidadorPageRoutingModule } from './cuidador-routing.module';

import { CuidadorPage } from './cuidador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuidadorPageRoutingModule
  ],
  declarations: [CuidadorPage]
})
export class CuidadorPageModule {}
