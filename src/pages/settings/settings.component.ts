import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { DbService } from '../../services/db.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  themeService = inject(ThemeService);
  dbService = inject(DbService);
  storageService = inject(StorageService);

  isDarkMode = this.themeService.isDarkMode;
  toastMessage = signal<string | null>(null);
  toastIsError = signal<boolean>(false);
  isSyncing = signal(false);

  storageInfo = this.storageService.storageInfo;
  storageWarning = computed(() => this.storageService.getStorageWarning());

  ngOnInit() {
    this.storageService.checkStorage();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  async clearData() {
    const confirmed = confirm('¿Está seguro de que desea eliminar todos los datos locales? Esta acción no se puede deshacer.');
    if (confirmed) {
      try {
        await this.dbService.clearDatabase();
        await this.storageService.checkStorage(); // Actualizar info de almacenamiento
        this.showToast('Todos los datos locales han sido eliminados.');
      } catch (error) {
        console.error('Failed to clear data:', error);
        this.showToast('Error al eliminar los datos.', true);
      }
    }
  }

  syncData() {
    this.isSyncing.set(true);
    setTimeout(() => {
      const success = Math.random() > 0.5; // Simulate success/failure
      if (success) {
        this.showToast('Sincronización completada con éxito.');
      } else {
        this.showToast('Fallo en la sincronización. Intente de nuevo.', true);
      }
      this.isSyncing.set(false);
    }, 2000);
  }
  
  showToast(message: string, isError: boolean = false) {
    this.toastIsError.set(isError);
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}