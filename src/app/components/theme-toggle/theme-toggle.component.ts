import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button 
      (click)="toggleTheme()" 
      class="bg-gray-200 dark:bg-gray-800 rounded-full p-2 transition-colors duration-300"
      aria-label="Basculer le mode sombre/clair"
    >
      <svg 
        *ngIf="isDarkMode" 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5 text-yellow-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m3.343-5.657l-.707-.707m12.728 12.728l.707.707M6.343 6.343l-.707-.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" 
        />
      </svg>
      <svg 
        *ngIf="!isDarkMode" 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5 text-gray-800" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
        />
      </svg>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // S'abonner au changement de thème
    this.themeService.isDarkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}