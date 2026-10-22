import { Injectable, signal } from "@angular/core";
import { User } from "@auth/interfaces/user.interface";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({providedIn: 'root'})

export class FrontNavbarService {

  private behavioSubject = new BehaviorSubject<User | null>(null);

  public observable: Observable<User | null> = this.behavioSubject.asObservable();

  user = signal<User | null>(null);

  updateCurrentUser(user: User | null) {
    this.behavioSubject.next(user);
  }
}
