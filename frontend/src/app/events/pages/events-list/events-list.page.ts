import { Component } from '@angular/core';
import { EventsListComponent } from './components/events-list/events-list.component.js';

@Component({
  selector: 'app-page-events-list',
  imports: [EventsListComponent],
  templateUrl: './events-list.page.html',
  styleUrl: './events-list.page.scss',
})
export class EventsListPage {

}

