import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

  @Input() message = '';
  visible = false;

  private resolve!: (value: boolean) => void;

  open(message: string): Promise<boolean> {
    this.message = message;
    this.visible = true;

    return new Promise(resolve => {
      this.resolve = resolve;
    });
  }

  confirm() {
    this.visible = false;
    this.resolve(true);
  }

  cancel() {
    this.visible = false;
    this.resolve(false);
  }

}