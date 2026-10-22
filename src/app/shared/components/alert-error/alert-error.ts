import { Component, inject, input, OnInit, signal } from "@angular/core";
import { AlertErrorService } from "./alert-error.service";


@Component({
  selector: 'alert-error',
  templateUrl: './alert-error.html'
})

export class AlertError implements OnInit {

  private _alerErrortService = inject(AlertErrorService);

  message = signal<string | null>(null);

  ngOnInit(): void {
    this._alerErrortService.observable.subscribe((messageParam: string | null) => {
      console.log('messageParam', messageParam);
      this.message.set(messageParam);
    });
  }

  closeAlert() {
    this._alerErrortService.clearError();
  }
}
