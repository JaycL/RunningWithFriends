import { Injectable, inject, signal } from '@angular/core';
import { ModelEvent, ModelSubEvent } from '../models/event.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/api.model.js';
import { mapApiData } from '../../utils/api.utils.js';
import { environment } from '../../../environment.ts/environment.js';

@Injectable({
  providedIn: 'root',
})


export class EventService {
  private http: HttpClient = inject(HttpClient);  

  private _events = signal<ModelEvent[]>([]);    
  private _loading = signal(true);        
  private _subeventsByEvent = signal<Record<number,ModelSubEvent[]>>({});
  
  events = this._events.asReadonly();
  loading = this._loading.asReadonly();
  subeventsByEvent = this._subeventsByEvent.asReadonly();


  loadEvents() {    
    if (this._events().length > 0) {
      return; // déjà chargé
    }
    
    this.http.get<ApiResponse<ModelEvent[]>>(environment.apiUrl+"events/events-with-subevent-count").pipe(
        tap(res => {          
          this._events.set(res.data);
          this._loading.set(false);    
        })
      ).subscribe();    
  }

  loadSubEvents(id: number) {
    const cache = this._subeventsByEvent();
    if (cache[id]) return ;  
    return this.http.get<ApiResponse<ModelSubEvent[]>>(environment.apiUrl+"events/"+id+"/subevents").pipe(
      tap(res => console.log("API RESPONSE", res)),
      mapApiData(),
      tap (subEvents => {
            this._subeventsByEvent.update(state => ({
              ...state,
              [id]: subEvents
            }));

      }
    )
  );
  }

  getEventById(eventId: number) : Observable<ModelEvent> {        
    return this.http.get<ApiResponse<ModelEvent>>(environment.apiUrl+"events/"+eventId).pipe(
      mapApiData(),
      tap(newEvent => {
          this._events.update(events => [...events, newEvent]);
        })
      );
  }

  updateEvent(updatedEvent: ModelEvent) : Observable<any> {
    return this.http.post<ApiResponse<any>>(environment.apiUrl+"events/", updatedEvent).pipe(
      mapApiData(),
      tap(
        eventUpApi => {  
          console.log("retour API");
          console.log(eventUpApi);
          eventUpApi.NbSubEvents = eventUpApi.subevents.length;
          if (updatedEvent.Id) {               
            this._events.update(events =>
              events.map(
                e => e.Id === eventUpApi.Id ? eventUpApi : e
              )
            )
          }
          else {            
             this._events.update(events => [...events, eventUpApi])            
          }

          this._subeventsByEvent.update(state => ({
              ...state,
              [eventUpApi.Id]: eventUpApi.subevents
              }));
    
          console.log("updateEvent");    
          console.log(this._subeventsByEvent()[eventUpApi.Id]);
          console.log("Fin updateEvent");    
        }      
    ));
  }
  
  saveEvent(event: any) : Observable<ModelEvent> {    
    return (this.updateEvent(event)).pipe();
  }

  deleteEvent(eventId: number) {
      console.log("delete");
      return this.http.get<ApiResponse<ModelEvent>>(environment.apiUrl+"events/"+eventId+"/delete").pipe(
      mapApiData(),
      tap(newEvent => {
          this._events.update(events => events.filter(e => e.Id !== eventId));
        })
      );
  }
}