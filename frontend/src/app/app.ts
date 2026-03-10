import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './core/services/modal.service.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [ ],
})



export class App {
  modalService = inject(ModalService);
  protected readonly title = signal('as-chouille');
}
