import { Component } from '@angular/core';
import {Pokemon} from "../../shared/interfaces/pokemon";
import {ApiService} from "../../shared/services/api.service";
import {ActivatedRoute} from "@angular/router";
import { PokemonVariety } from '../../shared/interfaces/pokemon-variety';
import { PokemonChain } from '../../shared/interfaces/pokemon-chain';
import { Move } from '../../shared/interfaces/move';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {

  pokemon!: Pokemon;
  pokemonevolution!: PokemonChain;
  Moves: Move[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    // Récupération de l'identifiant du Pokémon dans l'URL
    this.route.params.subscribe(params => {
      if (params['pokemon_id']) {
        // Appel de l'API pour récupérer les informations du Pokémon
        this.apiService.requestApi(`/pokemon/${params['pokemon_id']}`)
            .then((response: Pokemon) => {

        this.pokemon = response;
            });
            this.apiService.requestApi(`/pokemon/${params['pokemon_id']}/move`)
            .then((response: Move[]) => {  // Supposons que l'API renvoie un tableau
              this.Moves = response;
            });

            // Appel de l'API pour récupérer les informations sur l'évolution du Pokémon
            this.apiService.requestApi(`/pokemon/${params['pokemon_id']}/evolution`)
            .then((response: PokemonChain) => {
              this.pokemonevolution = response; // Stocker les données d'évolution dans une propriété distincte
            })
            
      }

    });
  }
  
}