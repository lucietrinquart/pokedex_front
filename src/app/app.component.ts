import { Component, OnInit } from '@angular/core';
import { ApiService } from "./shared/services/api.service";
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <!-- Bouton de thème positionné de manière fixe -->
      <div>
      <router-outlet></router-outlet>
      </div>

      
      <!-- Votre contenu principal -->

  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pokedex-front';

  constructor(
    public apiService: ApiService,
    private themeService: ThemeService
  ) {
    // Requête API initiale
    this.apiService.requestApi('/pokemon').then((pokemons) => {
      // Traitez les pokémons si nécessaire
    });
  }

  ngOnInit() {
    // Initialiser le thème au démarrage de l'application
    const currentTheme = this.themeService.getCurrentTheme();
    document.documentElement.classList.toggle('dark', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme ? 'dark' : 'light');
  }
}