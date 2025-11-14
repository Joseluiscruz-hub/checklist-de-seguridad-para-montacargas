import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DbService } from './db.service';
import { InspectionSession, IncidentReport } from '../models/checklist.model';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private http = inject(HttpClient);
  private dbService = inject(DbService);
  private apiUrl = 'http://localhost:3000';

  async syncPendingData(): Promise<{ syncedSessions: number; syncedIncidents: number }> {
    const unsyncedSessions = await this.dbService.getUnsyncedSessions();
    const unsyncedIncidents = await this.dbService.getUnsyncedIncidents();

    let syncedSessions = 0;
    let syncedIncidents = 0;

    for (const session of unsyncedSessions) {
      try {
        await firstValueFrom(this.http.post(`${this.apiUrl}/inspections`, session));
        await this.dbService.markSessionAsSynced(session.id);
        syncedSessions++;
      } catch (error) {
        console.error('Failed to sync session:', session.id, error);
      }
    }

    for (const incident of unsyncedIncidents) {
      try {
        await firstValueFrom(this.http.post(`${this.apiUrl}/incidents`, incident));
        if (incident.id) {
            await this.dbService.markIncidentAsSynced(incident.id);
            syncedIncidents++;
        }
      } catch (error) {
        console.error('Failed to sync incident:', incident.id, error);
      }
    }

    return { syncedSessions, syncedIncidents };
  }
}
