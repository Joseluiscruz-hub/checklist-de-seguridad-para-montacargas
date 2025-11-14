import { Injectable, signal } from '@angular/core';
import { InspectionSession, IncidentReport } from '../models/checklist.model';

const DB_NAME = 'ForkliftChecklistDB';
const DB_VERSION = 3; // Incremented version for schema update
const STORES = {
  SESSIONS: 'sessions',
  INCIDENTS: 'incidents',
  FORKLIFTS: 'forklifts',
  CREWS: 'crews',
  AREAS: 'areas',
};

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db: IDBDatabase | null = null;
  public dbInitialized = signal(false);

  constructor() {
    this.initDb();
  }

  private async initDb(): Promise<void> {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', request.error);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORES.SESSIONS)) {
        db.createObjectStore(STORES.SESSIONS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.INCIDENTS)) {
        db.createObjectStore(STORES.INCIDENTS, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORES.FORKLIFTS)) {
        db.createObjectStore(STORES.FORKLIFTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.CREWS)) {
        db.createObjectStore(STORES.CREWS, { keyPath: 'name' });
      }
      if (!db.objectStoreNames.contains(STORES.AREAS)) {
        db.createObjectStore(STORES.AREAS);
      }
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.dbInitialized.set(true);
      console.log('Database initialized successfully.');
    };
  }

  private getStore(storeName: string, mode: IDBTransactionMode): IDBObjectStore | null {
    if (!this.db) {
      console.error('Database is not initialized.');
      return null;
    }
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  public saveSession(session: InspectionSession): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(STORES.SESSIONS, 'readwrite');
      if (!store) {
        return reject('Store not available');
      }
      const request = store.put(session);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  public saveData<T>(storeName: string, data: T[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      if (!store) return reject('Store not available');

      const transaction = store.transaction;
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);

      store.clear();
      data.forEach(item => store.put(item));
    });
  }

  public getData<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readonly');
      if (!store) return reject('Store not available');

      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public getUnsyncedSessions(): Promise<InspectionSession[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(STORES.SESSIONS, 'readonly');
      if (!store) return reject('Store not available');

      const request = store.getAll();
      request.onsuccess = () => {
        const unsynced = request.result.filter(s => !s.synced);
        resolve(unsynced);
      };
      request.onerror = () => reject(request.error);
    });
  }

  public getUnsyncedIncidents(): Promise<IncidentReport[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(STORES.INCIDENTS, 'readonly');
      if (!store) return reject('Store not available');

      const request = store.getAll();
      request.onsuccess = () => {
        const unsynced = request.result.filter(i => !i.synced);
        resolve(unsynced);
      };
      request.onerror = () => reject(request.error);
    });
  }

  public markSessionAsSynced(sessionId: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const store = this.getStore(STORES.SESSIONS, 'readwrite');
      if (!store) return reject('Store not available');

      const request = store.get(sessionId);
      request.onsuccess = () => {
        const session = request.result;
        if (session) {
          session.synced = true;
          const updateRequest = store.put(session);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          reject('Session not found');
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  public markIncidentAsSynced(incidentId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(STORES.INCIDENTS, 'readwrite');
      if (!store) return reject('Store not available');

      const request = store.get(incidentId);
      request.onsuccess = () => {
        const incident = request.result;
        if (incident) {
          incident.synced = true;
          const updateRequest = store.put(incident);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          reject('Incident not found');
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  public saveIncident(incident: IncidentReport): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(STORES.INCIDENTS, 'readwrite');
      if (!store) {
        return reject('Store not available');
      }
      const request = store.add(incident);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  public getAllSessions(): Promise<InspectionSession[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(STORES.SESSIONS, 'readonly');
      if (!store) {
        return reject('Store not available');
      }
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public clearDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('Database not initialized');
      }
      const transaction = this.db.transaction(Object.values(STORES), 'readwrite');
      let completed = 0;
      const totalStores = this.db.objectStoreNames.length;

      if (totalStores === 0) {
        return resolve();
      }

      for (const storeName of this.db.objectStoreNames) {
        const request = transaction.objectStore(storeName).clear();
        request.onsuccess = () => {
          completed++;
          if (completed === totalStores) {
            resolve();
          }
        };
        request.onerror = () => reject(transaction.error);
      }
    });
  }
}
