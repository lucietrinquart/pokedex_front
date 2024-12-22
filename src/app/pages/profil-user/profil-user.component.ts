import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../shared/services/api.service";
import { PokemonUser } from "../../shared/interfaces/pokemon-user";


@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrl: './profil-user.component.scss'
})
export class ProfilUserComponent implements OnInit{
  isPopupOpen = false;
  companionPokemons: PokemonUser[] = [];
  companionPokemonIds: number[] = []; // IDs des Pokémon compagnons
  allPokemons: any[] = []; // Liste complète des Pokémon
  companionPokemonsWithNames: any[] = [];
  selectedPokemon: any = null;
  isLoading: boolean = false;
  pokemonCount: number = 0;
  pokemonCount2: number = 0;  



  get userName(): string {
    return this.apiService.user?.name ?? 'Invité';
  }

  get userdate(): string {
    const createdAt = this.apiService.user?.created_at ?? null;
  
    if (createdAt) {
      const date = new Date(createdAt);
      return date.getFullYear().toString(); 
    }
  
    return 'Invité'; 
  }
  

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Charger les Pokémon compagnons
    this.apiService.requestApi('/pokemonscompagnons').then((response: any) => {
      // Supposons que la réponse contienne un tableau de Pokémon compagnons
      this.companionPokemonIds = response.map((companion: any) => companion.pokemon_id);
      
      // Charger tous les Pokémon
      this.loadPokemonCount();
    });
    console.log('État initial des pokemons:', this.companionPokemons);
    this.loadPokemonCount();
    this.loadPokemonCount2().then(count => {
      console.log('Résultat final:', count);
    });
  }
  async loadPokemonCount() {
    try {
      const response = await this.apiService.requestApi('/pokemonscompagnons');
      let processedData: PokemonUser[];
      
      if (Array.isArray(response)) {
        processedData = (response.flat() as PokemonUser[]);
      } else if (response.data && Array.isArray(response.data)) {
        processedData = (response.data.flat() as PokemonUser[]);
      } else {
        processedData = (Object.values(response).flat() as PokemonUser[]);
      }
      
      this.companionPokemons = processedData;
      this.pokemonCount = this.companionPokemons.length;
      console.log('Nombre de pokemon:', this.pokemonCount);
      return this.pokemonCount;
    } catch (error) {
      console.error('Erreur:', error);
      return 0;
    }
  }
  async loadPokemonCount2(): Promise<number> {
    try {
      console.log('Début de la fonction');
      const response = await this.apiService.requestApi('/pokemonscompagnons');
      console.log('Réponse API brute:', response); // Nouveau log
      
      let processedData: PokemonUser[];
      
      if (Array.isArray(response)) {
        console.log('Response est un tableau');
        processedData = response.flat() as PokemonUser[];
      } else if (response.data && Array.isArray(response.data)) {
        console.log('Response.data est un tableau');
        processedData = response.data.flat() as PokemonUser[];
      } else {
        console.log('Utilisation de Object.values');
        processedData = Object.values(response).flat() as PokemonUser[];
      }
      
      console.log('ProcessedData:', processedData); // Nouveau log
      this.companionPokemons = processedData;
      const capturedCount = this.companionPokemons.length;
      
      console.log('Nombre de Pokémon capturés:', capturedCount);
      this.pokemonCount2 = 1025 - capturedCount;
      console.log('Nombre de Pokémon manquants:', this.pokemonCount2);
      
      return this.pokemonCount2;
    } catch (error) {
      console.error('Erreur détaillée:', error); // Log plus détaillé
      return 0;
    }
  }
  // Fonction pour charger les détails d'un Pokémon
  ajoutcompagnons(pokemonId: number) {
    this.isLoading = true;
    this.apiService.requestApi(`/pokemon/${pokemonId}`).then((response: any) => {
      this.selectedPokemon = response;
      this.isLoading = false;
    }).catch(error => {
      console.error('Erreur lors du chargement du Pokémon:', error);
      this.isLoading = false;
    });
  }



  loadAllPokemons() {
    this.apiService.requestApi('/pokemon').then((response: any) => {
      this.allPokemons = response;
      
      // Trouver les noms des Pokémon compagnons
      this.companionPokemonsWithNames = this.companionPokemonIds.map(companionId => {
        const pokemon = this.allPokemons.find(p => p.id === companionId);
        return {
          id: companionId,
          name: pokemon ? pokemon.name : 'Pokémon inconnu'
        };
      });
    });
  }

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
    
    if (this.isPopupOpen) {
      this.loadCompanionPokemons();
    }
  }

  loadCompanionPokemons() {
    this.apiService.requestApi('/pokemonscompagnons').then((response: any) => {
      let processedData: PokemonUser[];
      if (Array.isArray(response)) {
        processedData = (response.flat() as PokemonUser[]);
      } else if (response.data && Array.isArray(response.data)) {
        processedData = (response.data.flat() as PokemonUser[]);
      } else {
        processedData = (Object.values(response).flat() as PokemonUser[]);
      }
      this.companionPokemons = processedData;
    }).catch(error => {
      console.error('Erreur:', error);
    });
  }

  closePopup() {
    this.isPopupOpen = false;
  }
}