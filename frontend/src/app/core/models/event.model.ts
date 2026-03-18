export interface ModelParticipant {  
    Id: number;
    UserId: number;             
    SubEventId: number;
    ParticipationStatusId: number;
    Pseudo: string;
}

export interface ModelRace {  
    Id: number;         
    RaceTypeId: number;
    Distance: string;
    DistanceUnitId: number;
}

export interface ModelSubEvent {      
    Id: number;
    EventId: number;
    Name: string;
    SubEventTypeId: number;
    StartAt: string;    
    Races: ModelRace[]; /* utile pour les multi epreuve ex. triathlon / dualthlon*/
    Participants: ModelParticipant[]; /* liste des users qui sont inscrit à cette event */
}

export interface ModelEvent {
    Id: number,
    Name: string;
    City: string;
    StartAt: string;
    EndAt: string;
    IsPublic: boolean; 
    NbSubEvent: number;
    NbUserSubEvent: number;
}