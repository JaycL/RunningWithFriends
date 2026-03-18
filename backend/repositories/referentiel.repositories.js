import {query} from '../db/query.js';

import { log } from "../utils/logger.js";
const scope = "referentiel.repositories";


export async function getRaceTypes() {
  log(scope, "getRaceTypes");  
  return query(
      'SELECT * FROM race_type'
    );
}

export async function getSubeventTypes() {
  log(scope, "getSubeventTypes");
  return query(
      'SELECT * FROM sub_event_type'
    );
}

export async function getDistanceUnits() {
  log(scope, "getDistanceUnits");  
  return query(
      'SELECT * FROM distance_unit'
    );
}

export async function getParticipationStatus() {
  log(scope, "getParticipationStatus");    
  return query(
      'SELECT * FROM participation_status'
    );
}


