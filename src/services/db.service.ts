import { Injectable, signal } from '@angular/core';
import { InspectionSession, IncidentReport } from '../models/checklist.model';

const DB_NAME = 'ForkliftChecklistDB';
const DB_VERSION = 2; // Incremented version for schema update
const STORES = {
  SESSIONS: 'sessions',
  INCIDENTS: 'incidents',
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
