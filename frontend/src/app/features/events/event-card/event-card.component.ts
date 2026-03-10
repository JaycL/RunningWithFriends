import { Component, Input, inject, computed } from '@angular/core';
import { ModelEvent } from '../../../core/models/event.model';
import { DatePipe } from '@angular/common';
import { EventService } from '../../../core/services/event.service';
import { SubeventListComponent } from '../subevent-list/subevent-list.component.js';
import { ModalService } from '../../../core/services/modal.service.js';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe,SubeventListComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
  host: { class: 'event-card' }
})
export class EventCardComponent {
  eventService  = inject(EventService);
  modalService = inject(ModalService)

  @Input() event!: ModelEvent;
  
  isOpen: boolean = false;
  showModal = false;

  getSousEvents()  {
    this.eventService.loadSubEvents(this.event.Id)?.subscribe();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.event);
    this.getSousEvents();
  }  

  openEdit(event: any) {    
    this.showModal = true;
  }

  deleteEvent(event: any) {    
    if (confirm("Etes-vous sur de bien vouloir supprimer cet événement ?")) {
        this.eventService.deleteEvent(event.Id).subscribe();
    }    
  }

  onAfterSave() {
    console.log("after save");
  }
}
