import {query} from '../db/query.js';

export async function getRaceTypes() {
    return query(
      'SELECT * FROM Race_types'
    );
}

export async function getSubeventTypes() {
    return query(
      'SELECT * FROM Subevent_types'
    );
}

export async function getDistanceType() {
    return query(
      'SELECT * FROM Distance_Types'
    );
}

