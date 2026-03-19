import { Injectable, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs'
import { References, RaceType, SubEventType, DistanceUnit, ParticipationStatus } from '../models/referenciel.model.js';
import { environment } from '../../../environments/environment.js';
import { ApiResponse } from '../models/api.model.js';
import { mapApiData } from '../helpers/api.helper.js';

@Injectable({
  providedIn: 'root',
})


export class ReferentielService {
  private http: HttpClient = inject(HttpClient);

  subeventTypes: SubEventType[] = [];
  raceTypes: RaceType[] = [];
  raceTypeById = new Map<number,RaceType>();

  distanceUnit: DistanceUnit[] = [];
  distanceUnitById = new Map<number,DistanceUnit>();

  participationStatus: ParticipationStatus[] = [];
  participationStatusById = new Map<number,ParticipationStatus>();


  private isloaded: boolean = false;

  async getReferentiel() : Promise<References> {
    return await firstValueFrom(this.http.get<ApiResponse<References>>(environment.apiUrl+'referentiel').pipe(
        mapApiData()
    ));    
  }


  async loadReference(): Promise<void> {
    if (this.isloaded) return;
      await this.getReferentiel().then(ref => {
        this.raceTypes = ref.raceTypes;
        this.raceTypeById = new Map(this.raceTypes.map(rt => [rt.Id, rt]))
        this.subeventTypes = ref.subeventTypes;
        this.distanceUnit = ref.distanceUnits;
        this.distanceUnitById = new Map(this.distanceUnit.map(rt => [rt.Id, rt]))
        this.participationStatus = ref.participationStatus;
        this.participationStatusById = new Map(this.participationStatus.map(rt => [rt.Id, rt]))
      });

    this.isloaded = true;
  }
  
  getRaceTypeById(paramId: number) : RaceType {
    const raceReturn = this.raceTypeById?.get(paramId);
    return raceReturn ?? {Id: 0, Name: '', Description: '', Icone: ''}
  }

  getDistanceTypeById(paramId: number) : DistanceUnit {
    const distancTypeReturn = this.distanceUnitById?.get(paramId);
    return distancTypeReturn ?? {Id: 0, Name: '', Abbreviation: ''}
  }

  getParticipationStatusById(paramId: number) : DistanceUnit {    
    const refReturn = this.participationStatusById ?.get(paramId);
    return refReturn ?? {Id: 0, Name: '', Abbreviation: ''}
  }

}