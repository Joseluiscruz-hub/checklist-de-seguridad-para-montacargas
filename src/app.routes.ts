import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'checklist',
    loadComponent: () => import('./pages/checklist/checklist.component').then(c => c.ChecklistComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.component').then(c => c.HistoryComponent)
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats/stats.component').then(c => c.StatsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(c => c.SettingsComponent)
  },
  {
    path: '',
    redirectTo: '/checklist',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/checklist'
  }
];
