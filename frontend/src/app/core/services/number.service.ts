import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  parseFloat(value: any): number {

    if (value == null) return 0;

    return Number(
      value
        .toString()
        .replace(',', '.')
    );

  }

}