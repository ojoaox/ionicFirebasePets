import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async cadastrar() {
    const loading = await this.loadingCtrl.create({ message: 'Cadastrando...' });
    await loading.present();

    try {
      await this.authService.register(this.email, this.senha);
      await loading.dismiss();
      this.presentToast('Cadastro realizado com sucesso!', 'success');
      this.router.navigateByUrl('/login'); // ou /home, dependendo do fluxo
    } catch (error: any) {
      await loading.dismiss();
      this.presentToast('Erro ao cadastrar: ' + error.message, 'danger');
    }
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
