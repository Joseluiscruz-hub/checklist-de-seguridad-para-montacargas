import { Component, ChangeDetectionStrategy, effect, inject } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { signal } from '@angular/core';
import { filter } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class AppComponent {
  private router = inject(Router);
  private themeService = inject(ThemeService);
  
  activeRoute = signal('/checklist');

  navItems = [
    { path: '/checklist', icon: 'fa-clipboard-list', label: 'Checklist' },
    { path: '/history', icon: 'fa-history', label: 'Historial' },
    { path: '/stats', icon: 'fa-chart-pie', label: 'Estadísticas' },
    { path: '/settings', icon: 'fa-cog', label: 'Ajustes' },
  ];

  constructor() {
    effect(() => {
      // This effect runs whenever the theme signal in the service changes.
      const isDark = this.themeService.isDarkMode();
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeRoute.set(event.urlAfterRedirects);
    });
  }
}
