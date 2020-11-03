import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.page.html',
  styleUrls: ['./auth-page.page.scss'],
})
export class AuthPagePage implements OnInit {

  public loginForm: FormGroup;
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });
  }

  ngOnInit() {}

  async loginUser(): Promise<void> {
    const loading = await this.loadingCtrl.create();
    try {
      loading.present();

      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;
      await this.authService.loginUser(email, password);
      await loading.dismiss();
      this.router.navigateByUrl('/');
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        message: error.message,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
          },
        ],
      });
      alert.present();
    }
  }

}
