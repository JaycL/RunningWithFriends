import { Component } from '@angular/core';
import { EventListComponent } from '../../features/events/event-list/event-list.component';

@Component({
  selector: 'app-page-calendrier-component',
  imports: [EventListComponent],
  templateUrl: './page-calendrier-component.html',
  styleUrl: './page-calendrier-component.scss',
})
export class PageCalendrierComponent {

}
