import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  showEventModal = signal(false);
  selectedEvent = signal<any | null>(null);

  openCreate() {
    this.selectedEvent.set(null);
    this.showEventModal.set(true);
  }

  openEdit(event: any) {
    this.selectedEvent.set(event);
    this.showEventModal.set(true);
  }

  onSaveAfter() {
    this.selectedEvent.set(event);
    this.showEventModal.set(true);
  }


  close() {
    this.showEventModal.set(false);
  }
}