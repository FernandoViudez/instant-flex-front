import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
  animations: [fadeInUpAnimation]
})
export class SetPasswordComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;
  private token: string;

  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private snackService: MatSnackBar) {
  }

  async ngOnInit() {

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    await this.getTokenParam();
  }

  get notMatch() {
    let currentPass = this.form.get("password").value;
    let repeatPass = this.form.get("repeatPassword").value
    if (currentPass === repeatPass) {
      console.log("Son iguales");
      return false;
    } else {

      if(!this.form.get('repeatPassword').hasError('notMatch')){
        console.log("Seteó");
        this.form.get('repeatPassword').setErrors({notMatch: true});
        return true;
      }
      return true;
    }

  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  send() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach( control => {
        control.markAsTouched();
      })
    }

    this.authService.setPassword({ password: this.form.get("password").value }, this.token)
      .subscribe(data => {
        this.snackService.open('Hecho, ahora puedes entrar al sitio ingresando tu email y contraseña!', 'CERRAR', { duration: 4000 });
        this.router.navigate(['/login']);
      });
  }

  private getTokenParam() {
    return new Promise((resolve, reject) => {
      this.activatedRouter.params.subscribe(param => {
        this.token = param['token'];
        resolve(true);
      })
    });
  }

}
