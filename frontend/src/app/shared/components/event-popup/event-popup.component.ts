import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../../events/services/event.service';
import { finalize } from 'rxjs';
import { ModelEvent } from '../../../events/models/event.model.js';
import { ReferentielService } from '../../services/referentiel.service.js';
import { DateService } from '../../services/date.service.js';
import { NumberService } from '../../services/number.service.js';

@Component({
  selector: 'app-event-popup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-popup.component.html',
  styleUrl: './event-popup.component.scss',
})
export class EventPopupComponent {
  private eventService  = inject(EventService);
  referentielService  = inject(ReferentielService);
  dateService = inject(DateService);
  numberService = inject(NumberService);

  loading!: boolean;
  errorMessage!: string;

  private fb = inject(FormBuilder);

  @Input() event: ModelEvent | null = null; // si présent → mode édition
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

 
  formEvent: FormGroup = this.fb.group({
    Id: 0,
    Name: ['', Validators.required],
    City: ['', Validators.required],
    StartAt: ['', Validators.required],
    EndAt: ['', Validators.required],
    IsPublic: [true] ,
    subEvents: this.fb.array([])
  });

  async ngOnInit() {    
    
    await this.referentielService.loadReference();

    if (!this.event) return;
      console.log(this.dateService.toInput(this.event.StartAt));
      this.formEvent.patchValue({
        Id: this.event.Id,
        Name: this.event.Name,
        City: this.event.City,
        StartAt: this.dateService.toInput(this.event.StartAt),
        EndAt: this.dateService.toInput(this.event.EndAt),
        IsPublic: this.event.IsPublic
      });
      this.subEvents.clear();
      if (this.eventService.subeventsByEvent()[this.event.Id]) {
        this.loadSubevent();
      }
      else {
        this.eventService.loadSubEvents(this.event.Id)?.subscribe(subevents => {          
          this.loadSubevent();
      })                  
    }

  }

  loadSubevent() {
    console.log("load subevent");
    const Id = this.event?.Id;
    if (!Id) return;
    if (!this.eventService.subeventsByEvent()[Id]) return;
      console.log(this.eventService.subeventsByEvent()[Id]);
      this.eventService.subeventsByEvent()[Id].forEach(subevent => {
        this.createSubEvent(subevent);
      

      })
  }

  createSubEvent(subevent?: any) {
    this.subEvents.push(this.fb.group({
        Id: [subevent?.Id || 0] ,
        Name: [subevent?.Name || '', Validators.required],
        SubeventTypeId: [subevent?.SubeventTypeId || ''],
        StartAt: [this.dateService.toInput(subevent?.StartAt) || ''],
        Races: this.fb.array(
          subevent?.Races?.map((race: any) => this.loadRace(race)) || []
        )
    }))    
    console.log("fin creation subevent");
  }

loadRace(race: any = null) {
  console.log("loadRace : ");
  return this.fb.group({
    Id:[race?.Id || 0],
    RaceTypeId: [race?.RaceTypeId || 0],
    Distance: [race?.Distance || null],
    DistanceTypeId: [race?.DistanceTypeId || 0]
  });
}

createRace(idxSubevent: number, race: any = null) {
  console.log("createRace : "+ idxSubevent);
  this.getRaces(idxSubevent).push(this.fb.group({
    RaceTypeId: [race?.RaceTypeId || 0],
    Distance: [race?.Distance || null],
    DistanceTypeId: [race?.DistanceTypeId || '']
  }));
}

get subEvents(): FormArray {
  return this.formEvent.get("subEvents") as FormArray;
}
getRaces(idxSubevent: number): FormArray {
  return this.subEvents.at(idxSubevent).get("Races") as FormArray;
}

removeSubvent(index: number) {
  this.subEvents.removeAt(index);
}

removeRace(sousEventIndex: number, epreuveIndex: number) {
  this.getRaces(sousEventIndex).removeAt(epreuveIndex);
}


 
onSubmit() {
    
  if (this.formEvent.valid) {

      this.loading = true;
      this.errorMessage = ""; 
      
      const formValue = this.formEvent.value;
      const event = {
        ...formValue,
        StartAt: this.dateService.toUtc(formValue.StartAt),
        EndAt: this.dateService.toUtc(formValue.EndAt)
      }

      for (const subevent of event.subEvents) {
        subevent.StartAt = this.dateService.toUtc(subevent.StartAt)
         for (const race of subevent.Races) {
          race.Distance = this.numberService.parseFloat(race.Distance)
        }
      }
      
      this.eventService.saveEvent(event).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe({
        next: () => {
          this.save.emit();
          this.close.emit();
        },
        error: (err) => {
          this.errorMessage = "Erreur lors de la création";
          console.log(err);
        },        
      });
    }
  }

  onClose() { this.close.emit(); }
  closePopup() { this.close.emit(); }

}
