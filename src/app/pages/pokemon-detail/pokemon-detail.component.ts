import { Component, ViewChild, ElementRef } from '@angular/core';
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

  getBackgroundClass(): string {
    console.log(this.pokemon?.default_variety);
    
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 1) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      const className = `bg-img-${primaryType}`;
      console.log(className)
      const className1 = `bg-img-normal`;
      const className2 = `bg-img-fire`;
      const className3 = `bg-img-water`;
      const className4 = `bg-img-grass`;
      const className5 = `bg-img-electric`;
      const className6 = `bg-img-ice`;
      const className7 = `bg-img-fighting`;
      const className8 = `bg-img-poison`;
      const className9 = `bg-img-ground`;
      const className10 = `bg-img-flying`;
      const className11 = `bg-img-psychic`;
      const className12 = `bg-img-bug`;
      const className13 = `bg-img-rock`;
      const className14 = `bg-img-ghost`;
      const className15 = `bg-img-dragon`;
      const className16 = `bg-img-dark`;
      const className17 = `bg-img-steel`;
      const className18 = `bg-img-fairy`;      

      return className;
    }
    else if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 0) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();

      const className = `bg-img-${primaryType} bg-contain bg-center`;
      return className;
    }
    return '';
  }
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  playCry() {
    this.audioPlayer.nativeElement.play();
  }
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