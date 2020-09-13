import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {

    let email = this.storageService.checkItem('email');
    let password = this.storageService.checkItem('password');
    
    this.storageService.removeItem('role');
    this.storageService.deleteToken();
    
    this.form = this.fb.group({
      email: [email, Validators.required],
      password: [password, Validators.required],
      rememberMe: ['']
    });
  
  }

  async send() {
    if (this.form.invalid) { return; }

    let data = {
      email: this.form.get("email").value,
      password: this.form.get("password").value
    }


    this.authService.logIn(data).subscribe(async (data: any) => {
      console.log(data);
      this.storageService.setToken(data.message);

      this.authService.validateUserRole()
        .subscribe((data: any) => {

          if(this.form.get("rememberMe").value != ""){
            this.storageService.setItem("email", this.form.get("email").value)
            this.storageService.setItem("password", this.form.get("password").value)
          }
          
          this.storageService.setItem("role", data.message);

          if (data.message == 'USER_SELL') return this.router.navigate(['/']);
          if (data.message == 'USER_FLEX') return this.router.navigate(['/flex']);
          if (data.message == 'USER_ADMIN') return this.router.navigate(['/']);
        
        });



    })
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
}
