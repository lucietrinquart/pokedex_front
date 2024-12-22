import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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
import { MoveTranslation } from '../../shared/interfaces/move-translation';
import { TranslationMap } from '../../shared/interfaces/translation-map';
import { TypeWithTranslations } from '../../shared/interfaces/type-with-translations';
import { TypeTranslation } from '../../shared/interfaces/type-translation';
import { TypeMapping } from '../../shared/interfaces/type-mapping';




import { SwiperOptions } from 'swiper/types';
import { Translation } from "../../shared/interfaces/translation";
import {TranslocoService} from "@jsverse/transloco";



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
  currentSlide = 0;
  //typeTranslations: { [key: string]: string } = {};
  favorites: { [key: number]: boolean } = {};
  secondAbilityName: string | null = null;
  private translationMap: TranslationMap = {};
  selectedLang: string;
  private reverseTranslationMap: Map<string, string> = new Map();
  private typeMapping: TypeMapping = {};


  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private translocoService: TranslocoService,
  ) {
    this.selectedLang = this.translocoService.getActiveLang();
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
    this.selectedLang = this.translocoService.getActiveLang();
    
    this.translocoService.langChanges$.subscribe(newLang => {
      this.selectedLang = newLang;
      this.updateTypeTranslations();
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


    this.apiService.requestApi(`/pokemon/${pokemonId}/abilities`).then((response: Pokemon) => {
      if (response?.default_variety?.abilities && response.default_variety.abilities.length > 1) {
        const ability = response.default_variety.abilities[1];
        this.secondAbilityName = this.getAbilityName(ability);
        console.log('Second ability name translated:', this.secondAbilityName);
      } else {
        this.secondAbilityName = null;
      }
    });

    
  }

  formatPokemonNumber(id: number): string {
    return '#' + id.toString().padStart(4, '0');
  }

  getAbilityName(ability: Ability): string {
    const currentLang = this.translocoService.getActiveLang();
    
    if (!ability?.abilitetrainslation) {
      return ability?.name || 'Unknown Ability';
    }
    
    const translation = ability.abilitetrainslation.find(t => t.locale === currentLang);
    
    return translation?.name || ability.name;
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
    this.loadFavoriteStatus();
    this.loadTypeTranslations();
    this.translocoService.langChanges$.subscribe(() => {
      this.updateTypeTranslations();
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




  private updateTypeTranslations() {
    if (this.pokemonfaiblesse) {
      // Mettre à jour les traductions pour les faiblesses et résistances
      this.getFaiblesses();
      this.getResiste();
    }
  }

  private loadTypeTranslations() {
    this.apiService.requestApi('/type').then((types: TypeWithTranslations[]) => {
      types.forEach(type => {
        // Stockez le type original
        this.typeMapping[type.name] = {
          original: type.name,
          translations: {}
        };
        
        // Stockez les traductions
        type.translations.forEach((translation: TypeTranslation) => {
          this.typeMapping[type.name].translations[translation.locale] = translation.name;
          
          // Créez aussi une entrée pour la traduction qui pointe vers le type original
          this.typeMapping[translation.name.toLowerCase()] = {
            original: type.name,
            translations: {}
          };
        });
      });
      this.updateTypeTranslations();
    });
  }

  // Nouvelle méthode pour obtenir le type original à partir d'une traduction
  private getOriginalType(translatedType: string): string {
    const typeEntry = this.typeMapping[translatedType.toLowerCase()];
    return typeEntry ? typeEntry.original : translatedType;
  }

  // Modifiez la méthode getTypeStyles pour utiliser le mapping
  getTypeStyles(translatedType: string): { [key: string]: string } {
    const originalType = this.getOriginalType(translatedType);
    return {
      'color': `var(--${originalType}-500)`,
      'border-color': `var(--${originalType}-500)`,
      'background-color': `var(--${originalType}-700)`
    };
  }

  // Modifiez les méthodes getFaiblesses et getResiste
  getFaiblesses(): [string, number][] {
    if (!this.pokemonfaiblesse?.faible) return [];
    const currentLang = this.translocoService.getActiveLang();
    
    return Object.entries(this.pokemonfaiblesse.faible).map(([type, value]) => {
      const typeEntry = this.typeMapping[type];
      const translatedName = typeEntry?.translations[currentLang] || type;
      return [translatedName, value];
    });
  }

  getResiste(): [string, number][] {
    if (!this.pokemonfaiblesse?.resiste) return [];
    const currentLang = this.translocoService.getActiveLang();
    
    return Object.entries(this.pokemonfaiblesse.resiste).map(([type, value]) => {
      const typeEntry = this.typeMapping[type];
      const translatedName = typeEntry?.translations[currentLang] || type;
      return [translatedName, value];
    });
  }


  loadFavoriteStatus() {
    this.apiService.requestApi('/pokemonscompagnons', 'GET').then((response: any) => {
      response.forEach((pokemon: any) => {
        this.favorites[pokemon.id] = true;
      });
    });
  }

  // Modifier votre méthode addToFavorite
  addToFavorite(pokemonId: number) {
    this.apiService.requestApi(`/pokemon/${pokemonId}/add`, 'POST')
      .then((response: any) => {
        this.favorites[pokemonId] = true;  // Mettre à jour l'état
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  }


  getPokemonName(): string {
    const currentLang = this.translocoService.getActiveLang();
    
    // Vérification de l'existence des traductions du Pokémon
    if (!this.pokemon?.translations) {
      return this.pokemon?.name || 'Unknown Pokemon';
    }
    
    // Recherche de la traduction correspondant à la langue actuelle
    const translation = this.pokemon.translations.find(
      (trans: Translation) => trans.locale === currentLang
    );
    
    // Si une traduction existe et contient un nom, on l'utilise
    // Sinon on retourne le nom par défaut du Pokémon
    return translation?.name || this.pokemon.name || 'Unknown Pokemon';
  }
  getMoveTranslatedName(moveInfo: any): string {
    const currentLang = this.translocoService.getActiveLang();
    
    // Vérification de l'existence des traductions de l'attaque
    if (!moveInfo.move?.translations) {
      return moveInfo.move?.name || 'Unknown Move';
    }
    
    // Recherche de la traduction correspondant à la langue actuelle
    const translation = moveInfo.move.translations.find(
      (trans: MoveTranslation) => trans.locale === currentLang
    );
    
    // Si une traduction existe et contient un nom, on l'utilise
    // Sinon on retourne le nom par défaut de l'attaque
    return translation?.name || moveInfo.move.name || 'Unknown Move';
  }

  shouldShowSlider(): boolean {
    let totalEvolutions = 1; // Base case is the current Pokemon
  
    // Count previous evolutions
    if (this.pokemonevolution?.evolution_avant) {
      totalEvolutions += this.pokemonevolution.evolution_avant.length;
      this.pokemonevolution.evolution_avant.forEach(evo => {
        if (evo.previous_evolutions?.length) {
          totalEvolutions += evo.previous_evolutions.length;
        }
      });
    }
  
    // Count next evolutions
    if (this.pokemonevolution?.evolution_apres) {
      totalEvolutions += this.pokemonevolution.evolution_apres.length;
      this.pokemonevolution.evolution_apres.forEach(evo => {
        if (evo.next_evolutions?.length) {
          totalEvolutions += evo.next_evolutions.length;
        }
      });
    }
  
    return totalEvolutions > 3;
  }


  nextSlide() {
    // Calculate total slides dynamically
    const totalSlides = this.calculateTotalSlides();
    this.currentSlide = (this.currentSlide + 1) % totalSlides;
  }
  
  prevSlide() {
    // Calculate total slides dynamically
    const totalSlides = this.calculateTotalSlides();
    this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
  }
  
  private calculateTotalSlides(): number {
    let totalSlides = 1; // Base case is the current Pokemon
  
    // Add previous evolutions
    if (this.pokemonevolution?.evolution_avant) {
      totalSlides += this.pokemonevolution.evolution_avant.length;
      this.pokemonevolution.evolution_avant.forEach(evo => {
        if (evo.previous_evolutions?.length) {
          totalSlides += evo.previous_evolutions.length;
        }
      });
    }
  
    // Add next evolutions
    if (this.pokemonevolution?.evolution_apres) {
      totalSlides += this.pokemonevolution.evolution_apres.length;
      this.pokemonevolution.evolution_apres.forEach(evo => {
        if (evo.next_evolutions?.length) {
          totalSlides += evo.next_evolutions.length;
        }
      });
    }
  
    return totalSlides;
  }
}