import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({providedIn: 'root'})

export class AlertErrorService {

  private behaviorSubject = new BehaviorSubject<string | null>(null);

  public observable: Observable<string | null> = this.behaviorSubject.asObservable();


  public showMessage(message: string) {
    console.log('showMessage', message);
    this.behaviorSubject.next(message);
  }

  public clearError() {
    this.behaviorSubject.next(null);
  }
}
