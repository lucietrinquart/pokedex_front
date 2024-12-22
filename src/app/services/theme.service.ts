import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Vérifier si l'exécution se fait côté navigateur
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  private initializeTheme() {
    // Récupérer le thème précédemment sauvegardé
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      this.setDarkMode(true);
    } else if (savedTheme === 'light') {
      this.setDarkMode(false);
    } else {
      // Vérifier la préférence système par défaut
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      this.setDarkMode(prefersDarkScheme.matches);
    }
  }

  toggleTheme() {
    const newMode = !this.isDarkMode.value;
    this.setDarkMode(newMode);
  }

  setDarkMode(isDark: boolean) {
    // Mettre à jour le BehaviorSubject
    this.isDarkMode.next(isDark);
    
    // Sauvegarder la préférence de thème
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Appliquer le thème au document
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  // Méthode pour récupérer le thème actuel
  getCurrentTheme(): boolean {
    return this.isDarkMode.value;
  }
}