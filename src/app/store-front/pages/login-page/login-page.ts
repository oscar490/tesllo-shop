import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserTokenResponse } from "@auth/interfaces/user.interface";
import { AuthService } from "@auth/services/auth.service";
import { AlertError } from "@shared/components/alert-error/alert-error";
import { AlertErrorService } from "@shared/components/alert-error/alert-error.service";
import { FrontNavbarService } from "@store-front/components/front-navbar/front-navbar.service";
import { Router } from "@angular/router";


@Component({
  selector: 'login',
  templateUrl: './login-page.html',
  imports: [ReactiveFormsModule, AlertError]
})

export class LoginPage {

  public fb: FormBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _alertErrorService = inject(AlertErrorService);
  private _frontNavbarService = inject(FrontNavbarService);
  private _router = inject(Router);

  public passwordPattern = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  loading = signal<boolean>(false);

  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.passwordPattern)
    ]
  ]
  })

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    const validForm = this.loginForm.valid;
    const {email, password} = this.loginForm.value;

    this.loading.set(validForm);
    this._alertErrorService.clearError();

    if (validForm) {
      this._authService.login(email ?? '', password ?? '').subscribe({
        next: (userTokenResponse: UserTokenResponse) => {
          this._frontNavbarService.updateCurrentUser(userTokenResponse.user);
          this._router.navigate(['']);
        },
        complete: () => this.loading.set(false),
        error: (error) => {
          this._alertErrorService.showMessage(error);
          this.loading.set(false);
        }
      })
    }
  }

}
