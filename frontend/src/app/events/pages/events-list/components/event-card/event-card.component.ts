import { Component, Input, inject } from '@angular/core';
import { ModelEvent } from '../../../../models/event.model';
import { DatePipe } from '@angular/common';
import { EventService } from '../../../../services/event.service';
import { SubeventsListComponent } from '../subevents-list/subevents-list.component.js';
import { ModalService } from '../../../../../shared/services/modal.service.js';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe,SubeventsListComponent,MatIconModule, RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
  host: { class: 'event-card' }
})
export class EventCardComponent {
  eventService  = inject(EventService);
  modalService  = inject(ModalService)
 
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
