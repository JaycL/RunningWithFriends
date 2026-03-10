import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class serviceUser {

/*    private events: ModelEvent[] = [];*/
    constructor() {        
        this.init();
    }
    
    init() : void {

    }

    generateId() : string {
        return crypto.randomUUID().substring(0, 8);    
    }

    
    
}