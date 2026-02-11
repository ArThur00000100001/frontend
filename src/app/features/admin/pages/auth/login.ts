import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { API } from '../../../environment/environment';
import { AuthService, ILoginResponse } from '../../../../core/guards/auth.service';
import { Router } from '@angular/router';

export type IApiResponse<T = any> = {
  status: 'success' | 'failure';
  data: T;
  message: string;
};

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly showPassword = signal(false);
  readonly isSubmitting = signal(false);

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
    if (this.formData.invalid) return;

    this.isSubmitting.set(true);
    try {
      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(this.formData.value),
      });

      const result: IApiResponse<ILoginResponse> = await response.json();

      console.log('Respuesta del backend:', result);

      if (result.status === 'success') {
        const { access_token, user } = result.data;

        // Guardar en el servicio
        this.authService.token.set(access_token);
        this.authService.user.set(user);

        // Guardar en localStorage para la persistencia
        localStorage.setItem('token-raw', JSON.stringify(result.data));

        // Navegar a la página principal
        this.router.navigate(['/admin/home']);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Correo o contraseña incorrectos');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
