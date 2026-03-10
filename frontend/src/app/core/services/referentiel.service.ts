import { Injectable, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs'
import { References, RaceType, SubeventType, DistanceType } from '../models/referenciel.model.js';
import { environment } from '../../../environment.ts/environment.js';
import { ApiResponse } from '../models/api.model.js';
import { mapApiData } from '../../utils/api.utils.js';

@Injectable({
  providedIn: 'root',
})


export class ReferentielService {
  private http: HttpClient = inject(HttpClient);

  subeventTypes: SubeventType[] = [];
  raceTypes: RaceType[] = [];
  raceTypeById = new Map<number,RaceType>();

  distanceTypes: DistanceType[] = [];
  distanceTypeById = new Map<number,DistanceType>();

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
        this.distanceTypes = ref.distanceTypes;
        this.distanceTypeById = new Map(this.distanceTypes.map(rt => [rt.Id, rt]))
      });

    this.isloaded = true;
  }
  
  getRaceTypeById(paramId: number) : RaceType {
    const raceReturn = this.raceTypeById?.get(paramId);
    return raceReturn ?? {Id: 0, Name: '', Description: '', Icone: ''}
  }

  getDistanceTypeById(paramId: number) : DistanceType {
    const distancTypeReturn = this.distanceTypeById?.get(paramId);
    return distancTypeReturn ?? {Id: 0, Name: '', Abbreviation: ''}
  }


}