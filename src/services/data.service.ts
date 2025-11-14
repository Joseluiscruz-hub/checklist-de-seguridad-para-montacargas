import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Forklift } from '../models/checklist.model';
import { DbService } from './db.service';

const STORES = {
  FORKLIFTS: 'forklifts',
  CREWS: 'crews',
  AREAS: 'areas',
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private dbService = inject(DbService);
  private apiUrl = 'http://localhost:3000'; // URL of the mock backend

  private getOrFetchData<T>(storeName: string, endpoint: string): Observable<T[]> {
    return from(this.dbService.getData<T>(storeName)).pipe(
      switchMap(localData => {
        if (localData && localData.length > 0) {
          return of(localData);
        } else {
          return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`).pipe(
            tap(apiData => this.dbService.saveData(storeName, apiData))
          );
        }
      })
    );
  }

  getForklifts(): Observable<Forklift[]> {
    return this.getOrFetchData<Forklift>(STORES.FORKLIFTS, 'forklifts');
  }

  getCrews(): Observable<{ name: string; color: string }[]> {
    return this.getOrFetchData<{ name: string; color: string }>(STORES.CREWS, 'crews');
  }

  getAreas(): Observable<string[]> {
    return this.getOrFetchData<string>(STORES.AREAS, 'areas');
  }
}
