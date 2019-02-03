import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { APPDATA } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {

  constructor() { }
/**
 * Get the data
 */
  getData(): Observable<any> {
 
    return of(APPDATA);
  }
}
