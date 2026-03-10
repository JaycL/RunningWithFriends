import { AuditableEntity } from "./audit.models";

export interface ModelRace extends AuditableEntity{  
    Id: number;         
    RaceTypeId: number;
    Distance: string;
    DistanceTypeId: number;
}

export interface ModelSubEvent extends AuditableEntity{      
    Id: number;
    Name: string;
    SubeventTypeId: number;
    StartAt: string;    
    Races: ModelRace[]; /* utile pour les multi epreuve ex. triathlon / dualthlon*/
}

export interface ModelEvent extends AuditableEntity {
    Id: number,
    Name: string;
    City: string;
    StartAt: string;
    EndAt: string;
    IsPublic: boolean; 
    NbSubEvents: number;
}