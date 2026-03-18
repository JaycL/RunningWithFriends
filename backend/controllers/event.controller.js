
import * as eventService from "../services/event.service.js"
import { ApiResponse } from "../utils/ApiReponse.js";

import { log } from "../utils/logger.js";
const scope = "event.controller";

export async function getEventsWithStats (req, res) {    
    log(scope,"getEventsWithStats");
    const eventId = req.params.id
        ? Number(req.params.id)
        : null;

    const events = await eventService.getEventsWithStats(eventId);    
    if (!events) {
        throw new ApiError(404, "test not events");
    }
    res
    .status(200)
    .json(new ApiResponse(200,events,"events avec stats"));
};

export async function getSubevents (req, res) {
    log(scope,"getSubevents");
    const eventId = req.params.id;
    const result = await eventService.getSubEvents(eventId);    
    res
    .status(200)
    .json(new ApiResponse(200,result,"liste des subevent by event"));
};


export async function createUpdateEvent (req, res) {    
    log(scope,"createUpdateEvent");
    const result = await eventService.createUpdateEvent(req.body);
    res
    .status(200)
    .json(new ApiResponse(200,result,"liste of events with count of subevent"));
};


export async function deleteEvent (req, res) {    
    log(scope,"deleteEvent");
    const result = await eventService.deleteEvent(req.params.id);
    res
    .status(200)
    .json(new ApiResponse(200,result,"delete "));
};
