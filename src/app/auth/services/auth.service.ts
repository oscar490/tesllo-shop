import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { afterNextRender, inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { User, UserTokenResponse } from "@auth/interfaces/user.interface";
import { catchError, delay, Observable, tap, throwError } from "rxjs";
import { FrontNavbarService } from "@store-front/components/front-navbar/front-navbar.service";


@Injectable({providedIn: 'root'})

export class AuthService {

  private _http = inject(HttpClient);
  private _env = environment;

  getUserStorage(): User | null {
    const user = localStorage.getItem('user');
    const userObject = JSON.parse(user || '{}');

    return (Object.keys(userObject).length == 0) ? null : userObject;
  }

  login(email: string, password: string): Observable<UserTokenResponse> {
    return this._http.post<UserTokenResponse>(`${this._env.baseUrl}/auth/login`, {email: email, password: password}).pipe(
      tap((userTokenResponse: UserTokenResponse) => {
        localStorage.setItem('token', userTokenResponse.token);
        localStorage.setItem('user', JSON.stringify(userTokenResponse.user))
      }),
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message;
        const messageFilter = Array.isArray(message) ? message.join("") : message;

        return throwError(() => messageFilter)
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

}
