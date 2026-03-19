import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component.js';
import { ModalService } from '../../../shared/services/modal.service.js';
import { EventPopupComponent } from '../../../shared/components/event-popup/event-popup.component.js';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, EventPopupComponent],
  templateUrl: './main-layout.component.html',  
})
export class MainLayoutComponent {
    modalService = inject(ModalService);
}

