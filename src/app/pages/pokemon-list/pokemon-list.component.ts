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
  selectedType: any = null;
  searchTerm: string = '';

  constructor(public apiService: ApiService) {
    // Au démarrage, charge tous les Pokémon
    this.loadPokemonList();
    this.loadTypes();
  }
  async handleSearch(event: Event) {
    console.log("handleSearch appelé", event); // Debug
    const searchInput = event.target as HTMLInputElement;
    this.searchTerm = searchInput.value;
    console.log("Terme de recherche:", this.searchTerm); // Debug
    
    if (this.searchTerm.trim() === '') {
      console.log("Recherche vide, rechargement de la liste"); // Debug
      this.loadPokemonList();
      return;
    }

    try {
      this.isLoading = true;
      console.log("Appel API avec:", `/pokemon/search?q=${this.searchTerm}`); // Debug
      const results = await this.apiService.requestApi(`/pokemon/search?q=${this.searchTerm}`, 'GET');
      console.log("Résultats reçus:", results); // Debug
      
      if (!results || (Array.isArray(results) && results.length === 0)) {
        console.log("Aucun résultat trouvé"); // Debug
        this.pokemonList = {
          data: [],
          current_page: 1,
          last_page: 1,
          first_page_url: '',
          from: 0,
          last_page_url: '',
          path: '',
          per_page: 0,
          to: 0,
          total: 0
        };
        return;
      }
      
      // Adapter les résultats au format Paginate
      this.pokemonList = {
        data: Array.isArray(results) ? results : [results],
        current_page: 1,
        last_page: 1,
        first_page_url: '',
        from: 1,
        last_page_url: '',
        path: '',
        per_page: Array.isArray(results) ? results.length : 1,
        to: Array.isArray(results) ? results.length : 1,
        total: Array.isArray(results) ? results.length : 1
      };
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Méthode pour la recherche au clic sur le bouton
  searchPokemon() {
    console.log("searchPokemon appelé"); // Debug
    const searchInput = document.getElementById('site-search') as HTMLInputElement;
    if (searchInput) {
      console.log("Input trouvé, valeur:", searchInput.value); // Debug
      this.handleSearch({ target: searchInput } as unknown as Event);
    } else {
      console.log("Input non trouvé"); // Debug
    }
  }

  // Nouvelle méthode séparée pour charger les types
  loadTypes() {
    this.apiService.requestApi(`/type`, 'GET')
      .then((response: any) => {
        this.pokemonetype = response;
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des types:', error);
      });
  }

  loadPokemonList(page: number = 1) {
    if (this.isLoading) return;
    this.isLoading = true;
    
    const url = this.selectedType ? `/type/${this.selectedType.id}/pokemon` : '/pokemon';
    
    this.apiService.requestApi(url, 'GET', { page: page })
      .then((pokemons: any) => {
        if (page === 1) {
          if (Array.isArray(pokemons)) {
            const baseUrl = '/pokemon';
            this.pokemonList = {
              data: pokemons,
              current_page: page,
              last_page: 1,
              first_page_url: `${baseUrl}?page=1`,
              from: 1,
              last_page_url: `${baseUrl}?page=1`,
              path: baseUrl,
              per_page: pokemons.length,
              to: pokemons.length,
              total: pokemons.length
            };
          } else {
            this.pokemonList = pokemons;
          }
        } else {
          if (this.pokemonList) {
            const newData = Array.isArray(pokemons) 
              ? this.pokemonList.data.concat(pokemons)
              : this.pokemonList.data.concat(pokemons.data || []);
            
            const totalItems = newData.length;
            const baseUrl = '/pokemon';
            
            this.pokemonList = {
              ...this.pokemonList,
              data: newData,
              current_page: page,
              from: ((page - 1) * this.pokemonList.per_page) + 1,
              to: Math.min(page * this.pokemonList.per_page, totalItems),
              total: totalItems,
              last_page_url: `${baseUrl}?page=${this.pokemonList.last_page}`
            };
          }
        }
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des pokemon:', error);
        this.isLoading = false;
      });
  }

  // Gestionnaire de clic modifié
  handleTypeClick(type: Type | null) {
    console.log("je suis dans rien")
    // Si on clique sur le même type, on désélectionne
    if (this.selectedType?.id === type?.id) {
      console.log("je suis dans if", this.selectedType?.id, type?.id)
      this.selectedType = null;
    } else {
      this.selectedType = type;
      console.log("je suis dans else", this.selectedType)
    }
    
    // Réinitialise et recharge la liste
    this.pokemonList = undefined;
    this.loadPokemonList();
  }

  loadNextPokemonPage() {
    if (!this.pokemonList || this.pokemonList.last_page >= this.pokemonList.current_page + 1) {
      this.loadPokemonList(this.pokemonList ? this.pokemonList.current_page + 1 : 1);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 100) {
      this.loadNextPokemonPage();
    }
  }

  getTypeColor(typeName: string): string {
    const typeColors: { [key: string]: string } = {
      Normal: '#A8A878',
      Fire: '#F08030',
      Water: '#6890F0',
      Electric: '#F8D030',
      Grass: '#78C850',
      Ice: '#98D8D8',
      Fighting: '#C03028',
      Poison: '#A040A0',
      Ground: '#E0C068',
      Flying: '#A890F0',
      Psychic: '#F85888',
      Bug: '#A8B820',
      Rock: '#B8A038',
      Ghost: '#705898',
      Dragon: '#7038F8',
      Dark: '#705848',
      Steel: '#B8B8D0',
      Fairy: '#EE99AC'
    };
  
    return typeColors[typeName] || '#777777';
  }

  handleImageError(event: any) {
    console.error('Erreur de chargement d\'image:', event);
  }
}