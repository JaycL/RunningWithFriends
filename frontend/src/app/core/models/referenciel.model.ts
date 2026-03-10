export interface RaceType {
  Id: number;
  Name: string;
  Description: string;
  Icone: string;
}

export interface SubeventType {
  Id: number;
  Name: string;
  Description: string;
}

export interface DistanceType {
  Id: number;
  Name: string;
  Abbreviation: string;
}


export interface References {
  raceTypes: RaceType[];
  subeventTypes: SubeventType[];
  distanceTypes: DistanceType[];
}