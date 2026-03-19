import { Component, inject,signal, effect, computed } from '@angular/core';
import { EventService } from '../../../../services/event.service.js';
import { EventCardComponent } from '../event-card/event-card.component.js';
import { ModalService } from '../../../../../shared/services/modal.service.js';

@Component({
  selector: 'app-events-list',
  imports: [EventCardComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss',
})
export class EventsListComponent {
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
    this.eventService.loadEvents();
  }
}
