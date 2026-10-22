import { Component, inject, OnInit, signal } from "@angular/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { FrontNavbarService } from "./front-navbar.service";
import { User } from "@auth/interfaces/user.interface";
import { AuthService } from "@auth/services/auth.service";

@Component({
  selector: 'front-navbar',
  templateUrl: './front-navbar.html',
  imports: [RouterLink, RouterLinkActive]
})

export class FrontNavbar implements OnInit {

  user = signal<User | null>(null);

  private _frontNavbarService = inject(FrontNavbarService);
  private _authService = inject(AuthService);
  private _router = inject(Router)


  ngOnInit(): void {
    this._frontNavbarService.observable.subscribe((userParam: User | null) => {
      this.user.set(userParam)
    })

    this.user.set(this._authService.getUserStorage());
  }

  logout() {
    this._authService.logout();
    this.user.set(null);
    this._router.navigate(['login']);
  }
}
