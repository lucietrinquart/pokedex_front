import { Component, ViewChild, ElementRef } from '@angular/core';
import { Pokemon } from "../../shared/interfaces/pokemon";
import { ApiService } from "../../shared/services/api.service";
import { ActivatedRoute } from "@angular/router";
import { PokemonVariety } from '../../shared/interfaces/pokemon-variety';
import { PokemonChain } from '../../shared/interfaces/pokemon-chain';
import { Move } from '../../shared/interfaces/move';
import { Ability } from '../../shared/interfaces/ability';
import { Faiblesse } from '../../shared/interfaces/faiblesse';
import { GameVersion } from '../../shared/interfaces/game-version';
import { PokemonVersionMoves } from '../../shared/interfaces/pokemon-version-moves';
import { PokemonEvolution } from '../../shared/interfaces/pokemon-evolution';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  pokemon!: Pokemon;
  gameversion!: GameVersion;
  pokemonevolution!: PokemonChain;
  pokemonfaiblesse!: Faiblesse;
  Moves: Move[] = [];
  visibleMoves: any[] = [];
  showAll: boolean = false;
  abiliti!: Ability;
  selectedVersion: number = 1; 
  versionMoves: PokemonVersionMoves | null = null;
  gameVersions: GameVersion[] = []; 

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params['pokemon_id']) {
        this.loadPokemonData(params['pokemon_id']);
      }
    });
    this.route.params.subscribe(params => {
      if (params['pokemon_id']) {
        const pokemonId = params['pokemon_id'];
        this.loadPokemonData(pokemonId);
        this.loadGameVersions(); 
      }
    });
  }

  


  loadGameVersions() {
    this.apiService.requestApi('/version').then((response: GameVersion[]) => {
      this.gameVersions = response;
      if (this.gameVersions.length > 0) {
        this.selectedVersion = this.gameVersions[0].id;
        // Load moves for the first version by default
        if (this.pokemon) {
          this.loadMovesForVersion(this.pokemon.id.toString(), this.selectedVersion);
        }
      }
    });
  }
  


  loadPokemonData(pokemonId: string) {
    this.apiService.requestApi(`/pokemon/${pokemonId}`).then((response: Pokemon) => {
      this.pokemon = response;
      // Load game versions after pokemon is loaded
      this.loadGameVersions();
    });


    this.apiService.requestApi(`/pokemon/${pokemonId}/move`).then((response: Move[]) => {
      this.Moves = response;
      this.visibleMoves = this.Moves.slice(0, 6);
    });

    this.apiService.requestApi(`/pokemon/${pokemonId}/evolution`).then((response: PokemonChain) => {
      this.pokemonevolution = response;
    });

    this.apiService.requestApi(`/pokemon/${pokemonId}/typefaiblesse`).then((response: Faiblesse) => {
      this.pokemonfaiblesse = response;
    });

    this.apiService.requestApi(`/pokemon/${pokemonId}/abilities`).then((response: Ability) => {
      this.abiliti = response;
    });

    
  }

  
  loadMovesForVersion(pokemonId: string, versionId: number) {
    this.apiService.requestApi(`/pokemon/${pokemonId}/version/${versionId}`)
      .then((response: PokemonVersionMoves) => {
        this.versionMoves = response;
        this.visibleMoves = response.moves.slice(0, 6);
        this.showAll = false;
      });
  }
  ngOnInit(pokemonId: string) {
    this.apiService.requestApi(`/pokemon/${pokemonId}/evolution`).then((response: PokemonChain) => {
      this.pokemonevolution = this.processEvolutions(response);
    });
  }

  private processEvolutions(chain: PokemonChain): PokemonChain {
    // Traitement des évolutions suivantes (code existant)
    chain.evolution_apres = chain.evolution_apres.map(evolution => {
      if (evolution.next_evolutions === undefined) {
        evolution.next_evolutions = [];
        const nextEvo = this.findNextEvolution(evolution.evolves_to.id, chain);
        if (nextEvo.length > 0) {
          evolution.next_evolutions = nextEvo;
        }
      }
      return evolution;
    });

    // Traitement des évolutions précédentes
    chain.evolution_avant = chain.evolution_avant.map(evolution => {
      if (evolution.previous_evolutions === undefined) {
        evolution.previous_evolutions = [];
        const prevEvo = this.findPreviousEvolution(evolution.pokemon_variety.id, chain);
        if (prevEvo.length > 0) {
          evolution.previous_evolutions = prevEvo;
        }
      }
      return evolution;
    });

    return chain;
  }

  private findPreviousEvolution(pokemonId: number, chain: PokemonChain): PokemonEvolution[] {
    // Rechercher dans evolution_avant les évolutions qui ont evolves_to_id égal à pokemonId
    return chain.evolution_avant.filter(evo => 
      evo.evolves_to?.id === pokemonId
    );
  }

  private findNextEvolution(pokemonId: number, chain: PokemonChain): PokemonEvolution[] {
    // Rechercher dans evolution_apres les évolutions qui ont pokemon_variety_id égal à pokemonId
    return chain.evolution_apres.filter(evo => 
      evo.pokemon_variety?.id === pokemonId
    );
  }
  
  onVersionChange(versionId: number) {
    this.selectedVersion = versionId;
    if (this.pokemon) {
      this.loadMovesForVersion(this.pokemon.id.toString(), versionId);
    }
  }

  showMoreMoves() {
    if (this.versionMoves) {
      this.visibleMoves = this.versionMoves.moves;
      this.showAll = true;
    }
  }

  showLessMoves() {
    if (this.versionMoves) {
      this.visibleMoves = this.versionMoves.moves.slice(0, 6);
      this.showAll = false;
    }
  }

  toggleShowMore() {
    this.showAll = !this.showAll;
    this.visibleMoves = this.showAll ? this.Moves : this.Moves.slice(0, 6);
  }



  
  getBackgroundClass(): string {
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 0) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      return `bg-img-detail-${primaryType} bg-contain bg-center`;
    }
    return '';
  }

  getBackgroundColor(): string {
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 0) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      return `h-4 bg-${primaryType}-500 rounded-full dark:bg-${primaryType}-500`;
    }
    return '';
  }

  getBackgroundbordeur(): string {
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 0) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      return `m-2 p-2 border-2 border-${primaryType}-500 rounded-lg shadow-lg neon-effect text-center w-full border-blur-effect`;
    }
    return '';
  }

  getBackgroundbouton(): string {
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 0) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      return `px-4 py-2 bg-${primaryType}-500 text-white rounded-lg hover:bg-${primaryType}-700`;
    }
    return '';
  }

  playCry() {
    this.audioPlayer.nativeElement.play();
  }

  getFaiblesses(): [string, number][] {
    if (this.pokemonfaiblesse && this.pokemonfaiblesse.faible) {
      return Object.entries(this.pokemonfaiblesse.faible);
    }
    return [];
  }

  getResiste(): [string, number][] {
    if (this.pokemonfaiblesse && this.pokemonfaiblesse.faible) {
      return Object.entries(this.pokemonfaiblesse.resiste);
    }
    return [];
  }
}