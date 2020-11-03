import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FormValidations } from '../../validators/form';
import { UserProfile } from '../../models/user-profile';
import { ResponseObject, Gender, DocType } from '../../models/generic';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
})
export class SignupPagePage implements OnInit {

  public signupForm: FormGroup;
  readonly genderMale: number = Gender.male;
  readonly genderFemale: number = Gender.female;
  public userProfile: UserProfile;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      document_number: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birth_date: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength( 6 ), Validators.required])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength( 6 ), FormValidations.areEqual('password')])]
    });
  }

  ngOnInit() {}

  async signupUser(signupForm): Promise<void> {
    const loading = await this.loadingCtrl.create();
    try {

      loading.present();

      this.userProfile = {
        id: '',
        name: signupForm.value.last_name,
        email: signupForm.value.email,
        document_number: signupForm.value.document_number,
        phone: signupForm.value.phone,
        address: signupForm.value.address,
        birth_date: signupForm.value.birth_date
      };

      const respCreateUser: ResponseObject = await this.authService.createUser(this.userProfile, signupForm.value.password);
      await loading.dismiss();

      if ( respCreateUser.code === 0 ) {
        this.authService.sendEmailVerification();
        const toast = await this.toastController.create({
          message: 'Hemos enviado un correo electrónico para validar tu cuenta',
          duration: 10000
        });
        toast.present();
        this.router.navigateByUrl('/');
      } else {
        const toast = await this.toastController.create({
          message: respCreateUser.errMsg,
          duration: 10000
        });
        toast.present();
      }

    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        message: 'Usuario o contraseña no validos', // error.message,
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
