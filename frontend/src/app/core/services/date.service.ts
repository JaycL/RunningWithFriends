import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateService {

  toUtc(date: string) {
    return new Date(date).toISOString();
  }

  toInput(date: string) {
    const d = new Date(date);
    const offset = d.getTimezoneOffset() * 60000;

    if (!date) return '';
    if (isNaN(d.getTime())) return '';

    return new Date(d.getTime() - offset)
    .toISOString()
    .slice(0,16);
    
  }
}