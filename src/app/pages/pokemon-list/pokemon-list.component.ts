import { Component, HostListener } from '@angular/core';
import { ApiService } from "../../shared/services/api.service";
import { Paginate } from "../../shared/interfaces/paginate";
import { Pokemon } from "../../shared/interfaces/pokemon";
import { Type } from "../../shared/interfaces/type";


@Component({
  selector: 'app-pokemon-list', // Le sélecteur de ce composant, utilisé dans d'autres templates pour l'afficher
  templateUrl: './pokemon-list.component.html', // Chemin vers le fichier HTML de ce composant
  styleUrl: './pokemon-list.component.scss' // Chemin vers le fichier SCSS/CSS pour le style du composant
})
export class PokemonListComponent {

  // Variable qui stocke la liste des pokemons paginée
  pokemonList?: Paginate<Pokemon>;
  isLoading: boolean = false;
  pokemonetype: Type[] = []; 

  constructor(
    public apiService: ApiService, // Le service API utilisé pour faire des requêtes HTTP
  ) {

    // Appel initial pour charger la première page des pokemons
    this.loadNextPokemonPage();
  }

  // Fonction pour charger la prochaine page des pokemons
  loadNextPokemonPage() {
    if (this.isLoading) return; // Empêche l'appel si un chargement est en cours
    this.isLoading = true;

    let page = 1;
    if (this.pokemonList) {
      page = this.pokemonList.current_page + 1;
    }

    this.apiService.requestApi(`/type`, 'GET')
    .then((response: any) => {
      console.log('Réponse de l\'API:', response); // Affiche toute la réponse pour analyse
      // Assigne directement la réponse (sans vérifier `results` pour l'instant)
      this.pokemonetype = response; 
      console.log('Pokemon types:', this.pokemonetype); // Affiche ce que contient pokemonetype
      this.isLoading = false; // Terminé le chargement
    })
    .catch((error) => {
      console.error('Erreur lors de la requête API:', error); // Affiche l'erreur si la requête échoue
      this.isLoading = false; // Terminé le chargement en cas d'erreur
    });


    // On charge la page si elle n'existe pas ou si on n'a pas atteint la dernière
    if (!this.pokemonList || this.pokemonList.last_page >= page) {
      this.apiService.requestApi('/pokemon', 'GET', { page: page }).then((pokemons: Paginate<Pokemon>) => {
        // On ajoute les pokemons à la liste
        if (!this.pokemonList) {
          this.pokemonList = pokemons;
        } else {
          let datas = this.pokemonList.data.concat(pokemons.data);
          this.pokemonList = { ...pokemons, data: datas };
        }
        this.isLoading = false; // Terminé le chargement
      }).catch(() => {
        this.isLoading = false; // Terminé le chargement en cas d'erreur
      });
    } else {
      this.isLoading = false; // Si la page est déjà chargée ou hors limite
    }
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    // Si l'utilisateur arrive en bas de la page
    if (windowBottom >= docHeight - 100) {
      this.loadNextPokemonPage();
    }
  }
}