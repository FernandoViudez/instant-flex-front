import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPasswordRoutingModule } from './set-password-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SetPasswordComponent } from './set-password.component';


@NgModule({
  declarations: [SetPasswordComponent],
  imports: [
    CommonModule,
    SetPasswordRoutingModule,
    MaterialModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ]
})
export class SetPasswordModule { }
