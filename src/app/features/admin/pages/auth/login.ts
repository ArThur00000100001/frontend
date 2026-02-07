import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { URL } from '../../../environment/environment';
import { IUser } from '../../models/admin.types';
import { ILoginResponse } from '../../../../core/guards/auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  readonly formData = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.minLength(12),
      Validators.maxLength(50),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
    ]),
  });

  async onSubmit() {
    const response = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },

      body: JSON.stringify(this.formData.value),
    })
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err);
      });

    // if(responser.ok){
    //   const data = responser.
    // }
  }
}
