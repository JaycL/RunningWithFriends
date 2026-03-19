import { Component, Input, inject } from '@angular/core';
import { ModelSubEvent } from '../../../../models/event.model';
import { DatePipe } from '@angular/common';
import { ReferentielService } from '../../../../../shared/services/referentiel.service.js';
import { ParticipantService } from '../../../../services/participant.service.js';
import { AuthService } from '../../../../../core/services/auth.service.js';
import { EventService } from '../../../../services/event.service.js';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-subevent-card',
  imports: [DatePipe,MatIconModule],
  templateUrl: './subevent-card.component.html',
  styleUrl: './subevent-card.component.scss',
})
export class SubeventCardComponent {
  @Input()  subEvent! : ModelSubEvent;

  referentielService = inject(ReferentielService);
  participantService = inject(ParticipantService);
  eventService      = inject(EventService)
  private authService = inject(AuthService)


  participantsOpen = false;

  async ngOnInit() {
    console.log(this.subEvent);
    await this.referentielService.loadReference();
  }

  ngOnChanges() {
    console.log("subevent changed", this.subEvent.Races);
  }

  async addStatus(idStatut: number) {
    console.log("addStatus");
    const ret = await this.participantService.particpatantUpdate(this.subEvent.Id, idStatut)
    if (ret > 0) {
      const userId = this.authService.currentUser()?.Id;
      const user = this.authService.currentUser();
      if (!user) return;
      const p = this.subEvent.Participants.find(
              x =>  x.UserId === this.authService.currentUser()?.Id &&
                    x.SubEventId === this.subEvent.Id
                );      
      if (p) {
        p.ParticipationStatusId = idStatut
      }
      else {
        this.subEvent.Participants.push({
            Id: ret,
            UserId: user.Id,
            SubEventId: this.subEvent.Id,
            ParticipationStatusId: idStatut,
            Pseudo: user.Pseudo
        });  

        // reload l'event pour update les count 
        console.log(this.subEvent.EventId)
        this.eventService.loadEventById(this.subEvent.EventId);

      }

      

    }
      

  }

  toogleParticipants() {
    this.participantsOpen = !this.participantsOpen;
  }

}
