export interface RaceType {
  Id: number;
  Name: string;
  Description: string;
  Icone: string;
}

export interface SubEventType {
  Id: number;
  Name: string;
  Description: string;
}

export interface DistanceUnit {
  Id: number;
  Name: string;
  Abbreviation: string;
}

export interface ParticipationStatus {
  Id: number;
  Name: string;
  Abbreviation: string;
}


export interface References {
  raceTypes: RaceType[];
  subeventTypes: SubEventType[];
  distanceUnits: DistanceUnit[];
  participationStatus: ParticipationStatus[];
}