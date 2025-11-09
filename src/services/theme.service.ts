import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.loadTheme();
  }

  private loadTheme() {
    const storedPreference = localStorage.getItem('theme');
    if (storedPreference) {
      this.isDarkMode.set(storedPreference === 'dark');
    } else {
      this.isDarkMode.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  toggleTheme() {
    this.isDarkMode.update(isDark => {
      const newTheme = !isDark;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  }
}
