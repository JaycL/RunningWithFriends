import { Component, Input, inject, computed } from '@angular/core';
import { SubeventCardComponent } from '../subevent-card/subevent-card.component';
import { EventService } from '../../../core/services/event.service.js';

@Component({
  selector: 'app-subevent-list',
  imports: [SubeventCardComponent],
  templateUrl: './subevent-list.component.html',
  styleUrl: './subevent-list.component.scss',
})
export class SubeventListComponent {
  @Input() eventId!: number;

  subevents = computed(() => {
    console.log("SubeventListComponent computed");
    return this.eventService.subeventsByEvent()[this.eventId] ?? [];
  });

  eventService = inject(EventService);
}
