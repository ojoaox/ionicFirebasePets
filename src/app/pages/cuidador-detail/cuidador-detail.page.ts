import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data, Cuidador } from '../../services/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cuidador-detail',
  templateUrl: './cuidador-detail.page.html',
  styleUrls: ['./cuidador-detail.page.scss'],
  standalone: false
})
export class CuidadorDetailPage implements OnInit {

  cuidador: Cuidador = {
    name: '',
    phone: '',
    experience: 0,
    especialty: ''
  };

  cuidadorId: string | null = null;
  isNewCuidador = true;

  constructor(
    private route: ActivatedRoute,
    private data: Data,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cuidadorId = this.route.snapshot.paramMap.get('id');

    if (this.cuidadorId) {
      this.isNewCuidador = false;
      this.loadCuidador();
    }
  }

  loadCuidador() {
    this.data.getCuidador(this.cuidadorId!).subscribe(res => {
      if (res) {
        this.cuidador = res;
      } else {
        this.presentToast('Cuidador não encontrado!');
        this.router.navigateByUrl('/home');
      }
    }, err => {
      this.presentToast('Erro ao carregar cuidador.⚠');
      this.router.navigateByUrl('/home');
    });
  }

  salvarCuidador() {
    if (this.isNewCuidador) {
      this.data.adicionarCuidador(this.cuidador).then(() => {
        this.router.navigateByUrl('/home');
      }, err => {
        this.presentToast('Erro ao adicionar cuidador.⚠');
      });
    } else {
      this.data.updateCuidador(this.cuidador).then(() => {
        this.router.navigateByUrl('/home');
      }, err => {
        this.presentToast('Erro ao atualizar cuidador.⚠');
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
