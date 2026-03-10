import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header.component/header.component.js';
import { ModalService } from '../../services/modal.service.js';
import { EventPopupComponent } from '../../../shared/event-popup.component/event-popup.component.js';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, EventPopupComponent],
  templateUrl: './main-layout.component.html',  
})
export class MainLayoutComponent {
    modalService = inject(ModalService);
}

