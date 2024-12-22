import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../shared/services/api.service";

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss'
})
export class PokemonSearchComponent implements OnInit {
  searchResults: any[] = [];
  searchQuery: string = '';

  constructor(
    public apiService: ApiService
  ){}

  ngOnInit() {
    // Initialisation sans recherche par défaut
    console.log('Component initialized');
  }

  handleSearch() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      this.searchPokemon(this.searchQuery);
    }
  }

  searchPokemon(query: string) {
    this.apiService.requestApi('/pokemon/search', "GET", {query: query})
      .then(reponses => {
        console.log('Raw API response:', reponses);
        if (Array.isArray(reponses)) {
          this.searchResults = reponses;
          console.log('Search results updated:', this.searchResults);
        } else {
          console.error('Response is not an array:', reponses);
        }
      })
      .catch(error => {
        console.error('API error:', error);
      });
  }
}