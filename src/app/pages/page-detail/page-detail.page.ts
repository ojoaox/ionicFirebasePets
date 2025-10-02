import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data, Pet } from '../../services/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.page.html',
  styleUrls: ['./page-detail.page.scss'],
  standalone: false
})
export class PageDetailPage implements OnInit {

  pet: Pet = {
    name: '',
    especie: '',
    race: '',
    age: 0,
    obs: '',
  };

  petId: string | null = null;
  isNewPet = true;

  constructor(
    private route: ActivatedRoute,
    private data: Data,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.petId = this.route.snapshot.paramMap.get('id');

    if (this.petId) {
      this.isNewPet = false;
      this.loadPet();
    }
  }

  loadPet() {
    this.data.getPet(this.petId!).subscribe(res => {
      if (res) {
        this.pet = res;
      } else {
        this.presentToast('Pet não encontrado!');
        this.router.navigateByUrl('/home');
      }
    }, err => {
      this.presentToast('Erro ao carregar pet.');
      this.router.navigateByUrl('/home');
    });
  }

  savePet() {
    if (this.isNewPet) {
      this.data.adicionarPet(this.pet).then(() => {
        this.router.navigateByUrl('/home');
      }, err => {
        this.presentToast('Erro ao adicionar pet.⚠');
      });
    } else {
      this.data.updatePet(this.pet).then(() => {
        this.router.navigateByUrl('/home');
      }, err => {
        this.presentToast('Erro ao atualizar pet.⚠');
      });
    }
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
