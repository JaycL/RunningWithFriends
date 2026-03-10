
import * as eventService from "../services/events.service.js"
import { ApiResponse } from "../utils/ApiReponse.js";

export async function getEvents (req, res) {
    console.log("getEvents");  
    const events = await eventService.getEvents();
    if (!events) {
        throw new ApiError(404, "test not events");
    }
    res
    .status(200)
    .json(new ApiResponse(200,events,"liste of events"));
};


export async function getEventsWithSubEventCount (req, res) {
    console.log("controller getEventsWithSubEventCount");  
    const events = await eventService.getEventsWithSubEventCount();    
    if (!events) {
        throw new ApiError(404, "test not events");
    }
    res
    .status(200)
    .json(new ApiResponse(200,events,"liste of events with count of subevent"));
};

export async function getSubevents (req, res) {
    console.log("controller getsubevents"); 
    const eventId = req.params.id;
    const result = await eventService.getSubEvents(eventId);
    res
    .status(200)
    .json(new ApiResponse(200,result,"liste of events with count of subevent"));
};


export async function createUpdateEvent (req, res) {
    console.log("creation ou update event"); 
    
    console.log(req);
    const result = await eventService.createUpdateEvent(req.body);
    res
    .status(200)
    .json(new ApiResponse(200,result,"liste of events with count of subevent"));
};


export async function deleteEvent (req, res) {
    console.log("Delete Even"); 
    const result = await eventService.deleteEvent(req.params.id);
    res
    .status(200)
    .json(new ApiResponse(200,result,"delete "));
};
