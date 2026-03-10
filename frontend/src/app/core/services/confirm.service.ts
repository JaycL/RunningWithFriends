import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmService {

  dialog!: ConfirmDialogComponent;

  register(dialog: ConfirmDialogComponent) {
    this.dialog = dialog;
  }

  confirm(message: string) {
    return this.dialog.open(message);
  }

}