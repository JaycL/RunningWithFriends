import { Component } from '@angular/core';
import { EventListComponent } from '../../features/events/event-list/event-list.component.js';

@Component({
  selector: 'app-page-events',
  imports: [EventListComponent],
  templateUrl: './page-events.component.html',
  styleUrl: './page-events.component.scss',
})
export class PageEventsComponent {

}

