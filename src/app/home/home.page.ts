import { Component } from '@angular/core';

import { Data, Pet, Cuidador } from '../services/data';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  pets: Pet[] = [];
  cuidadores: Cuidador[] = [];

  constructor(
    private data: Data,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(){
    this.data.getPets().subscribe(res => {
      this.pets = res;
    });
    this.data.getCuidadores().subscribe(res => {
      this.cuidadores = res;
    });
  }

  adicionarPet(){
    this.router.navigateByUrl('/page-detail');
  }
  adicionarCuidador(){
    this.router.navigateByUrl('/cuidador');
  }

  editarPet(pet: Pet){
    this.router.navigateByUrl(`/page-detail/${pet.id}`);
  }

  editarCuidador(cuidador: Cuidador){
    this.router.navigateByUrl(`/cuidador/${cuidador.id}`);
  }

  async deletarPet(id: string){
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Você deseja excluir este pet?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.data.deletarPet(id);
          },
        },
      ],
    });
    await alert.present();
  }

  async deletarCuidador(id: string){
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Você deseja excluir este cuidador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.data.deletarCuidador(id);
          },
        },
      ],
    });
    await alert.present();
  }

}
