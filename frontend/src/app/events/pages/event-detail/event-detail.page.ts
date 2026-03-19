import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  imports: [],
  templateUrl: './event-detail.page.html',
  styleUrl: './event-detail.page.scss',
})
export class EventDetailPage {
  route = inject(ActivatedRoute);

  ngOnInit() {
    const eventId = Number(this.route.snapshot.paramMap.get('eventId'));
  }
  

}
