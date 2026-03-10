import { Component, Input, inject } from '@angular/core';
import { ModelRace } from '../../../core/models/event.model';
import { ReferentielService } from '../../../core/services/referentiel.service.js';

@Component({
  selector: 'app-race-card',
  imports: [],
  templateUrl: './race-card.component.html',
  styleUrl: './race-card.component.scss',
})
export class RaceCardComponent {
  @Input() race!: ModelRace;
  
  referentielService = inject(ReferentielService);

  async ngOnInit() {
    await this.referentielService.loadReference();
  }


}
