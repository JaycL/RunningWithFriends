import { Component, inject,signal, effect, computed } from '@angular/core';
import { EventService } from '../../../core/services/event.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { ModalService } from '../../../core/services/modal.service.js';

@Component({
  selector: 'app-event-list',
  imports: [EventCardComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {
  eventService  = inject(EventService);
  modalService  = inject(ModalService)
  private openedEvents     = signal<Record<string,boolean>>({});
  showModal : boolean = false;

  listEvenement = computed(() => this.eventService.events());;
  loading = this.eventService.loading();

  constructor() {
    this.eventService.loadEvents();
  }

  openCreate() {    
    this.showModal = true;
  }

  afterOnSave() {
    console.log("retour ajout event");
    this.eventService.loadEvents();
  }
}
