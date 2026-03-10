import { Component, Input, inject } from '@angular/core';
import { ModelSubEvent } from '../../../core/models/event.model';
import { DatePipe } from '@angular/common';

import { ReferentielService } from '../../../core/services/referentiel.service.js';

@Component({
  selector: 'app-subevent-card',
  imports: [DatePipe],
  templateUrl: './subevent-card.component.html',
  styleUrl: './subevent-card.component.scss',
})
export class SubeventCardComponent {
  @Input()  subEvent! : ModelSubEvent;

   referentielService = inject(ReferentielService);

  async ngOnInit() {
    await this.referentielService.loadReference();
  }

getRaces() { 
  console.log(this.subEvent.Races);
  return this.subEvent.Races 

}
ngOnChanges() {
  console.log("subevent changed", this.subEvent.Races);
}
}
