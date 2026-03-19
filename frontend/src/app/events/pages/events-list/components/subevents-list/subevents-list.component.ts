import { Component, Input, inject, computed } from '@angular/core';
import { SubeventCardComponent } from '../subevent-card/subevent-card.component';
import { EventService } from '../../../../services/event.service.js';

@Component({
  selector: 'app-subevents-list',
  imports: [SubeventCardComponent],
  templateUrl: './subevents-list.component.html',
  styleUrl: './subevents-list.component.scss',
})
export class SubeventsListComponent {
  @Input() eventId!: number;

  subevents = computed(() => {
    console.log("SubeventListComponent computed");
    return this.eventService.subeventsByEvent()[this.eventId] ?? [];
  });

  eventService = inject(EventService);
}
