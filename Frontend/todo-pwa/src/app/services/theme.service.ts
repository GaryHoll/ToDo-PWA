import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ColorTheme = 'green' | 'red' | 'yellow' | 'blue';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private colorThemeSubject = new BehaviorSubject<ColorTheme>('green');
  colorTheme$ = this.colorThemeSubject.asObservable();

  private readonly THEME_KEY = 'color-theme';

  constructor() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem(this.THEME_KEY) as ColorTheme;
    if (savedTheme) {
      this.setColorTheme(savedTheme);
    }
  }

  setColorTheme(theme: ColorTheme) {
    // Remove all color theme classes
    document.body.classList.remove('red-theme', 'yellow-theme', 'blue-theme');
    
    // Add new theme class if not green (default)
    if (theme !== 'green') {
      document.body.classList.add(`${theme}-theme`);
    }
    
    // Save to localStorage and update subject
    localStorage.setItem(this.THEME_KEY, theme);
    this.colorThemeSubject.next(theme);
  }

  getCurrentColorTheme(): ColorTheme {
    return this.colorThemeSubject.value;
  }
} 