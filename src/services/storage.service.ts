import { Injectable, signal } from '@angular/core';

export interface StorageInfo {
  usage: number; // en bytes
  quota: number; // en bytes
  usagePercentage: number; // 0-100
  usageMB: number;
  quotaMB: number;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storageInfo = signal<StorageInfo | null>(null);
  isNearLimit = signal(false); // true si usage > 80%

  constructor() {
    this.checkStorage();
  }

  /**
   * Verifica el uso actual del almacenamiento
   */
  async checkStorage(): Promise<StorageInfo | null> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        const usage = estimate.usage || 0;
        const quota = estimate.quota || 0;
        const usagePercentage = quota > 0 ? (usage / quota) * 100 : 0;

        const info: StorageInfo = {
          usage,
          quota,
          usagePercentage,
          usageMB: usage / (1024 * 1024),
          quotaMB: quota / (1024 * 1024),
        };

        this.storageInfo.set(info);
        this.isNearLimit.set(usagePercentage > 80);

        return info;
      } catch (error) {
        console.error('Error al verificar almacenamiento:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Retorna un mensaje de advertencia si el almacenamiento está casi lleno
   */
  getStorageWarning(): string | null {
    const info = this.storageInfo();
    if (!info) return null;

    if (info.usagePercentage > 90) {
      return `⚠️ Almacenamiento crítico: ${info.usagePercentage.toFixed(1)}% usado (${info.usageMB.toFixed(1)} MB de ${info.quotaMB.toFixed(1)} MB). Considere exportar y eliminar datos antiguos.`;
    }

    if (info.usagePercentage > 80) {
      return `⚠️ Almacenamiento alto: ${info.usagePercentage.toFixed(1)}% usado (${info.usageMB.toFixed(1)} MB de ${info.quotaMB.toFixed(1)} MB).`;
    }

    return null;
  }

  /**
   * Formatea el tamaño en bytes a un formato legible
   */
  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
