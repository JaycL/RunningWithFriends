import { Injectable, inject, signal } from '@angular/core';
import { ModelEvent, ModelSubEvent } from '../models/event.model';
import { Observable, tap } from 'rxjs';

import { ApiService } from './api.service.js';

@Injectable({
  providedIn: 'root',
})


export class EventService {
  private api = inject(ApiService);
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
    
    this.api.get<ModelEvent[]>("events/events-with-stats").pipe(
        tap(res => {   
          console.log(res);       
          this._events.set(res);
          this._loading.set(false);    
        })
      ).subscribe();    
  }


   loadEventById(evenId: number) {    
    this.api.get<ModelEvent[]>("events/"+evenId+"/with-stats").pipe(
        tap(res => {   
          const updated = res[0]
          this._events.update(list => 
            list.map(e => e.Id === evenId ? updated : e)
          )          
        })
      ).subscribe();    
  }


  loadSubEvents(id: number) {
    const cache = this._subeventsByEvent();
    if (cache[id]) return ;  
    
    return this.api.get<ModelSubEvent[]>("events/"+id+"/subevents")
      .pipe(           
      tap (subEvents => {
            console.log(subEvents);
            this._subeventsByEvent.update(state => ({
              ...state,
              [id]: subEvents
            }));

          }) 
    );
  }

  getEventById(eventId: number) : Observable<ModelEvent> {        
    return this.api.get<ModelEvent>("events/"+eventId).pipe(      
      tap(newEvent => {
          this._events.update(events => [...events, newEvent]);
        })
      );
  }

  updateEvent(updatedEvent: ModelEvent) : Observable<any> {
    return this.api.post<any>("events/", updatedEvent).pipe(      
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
      return this.api.get<ModelEvent>("events/"+eventId+"/delete").pipe(      
      tap(newEvent => {
          this._events.update(events => events.filter(e => e.Id !== eventId));
        })
      );

  }
}