import { Component, Input } from '@angular/core';
import { ModelRace } from '../../../core/models/event.model';
import { RaceCardComponent } from '../race-card/race-card.component';
@Component({
  selector: 'app-race-list',
  imports: [RaceCardComponent],
  templateUrl: './race-list.component.html',
  styleUrl: './race-list.component.scss',
})
export class RaceListComponent {
  @Input() races! : ModelRace[];

}
