import { Component, Input} from '@angular/core';
import { Pokemon } from "../../interfaces/pokemon";
import { Translation } from "../../interfaces/translation";

import {TranslocoService} from "@jsverse/transloco";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent{
  @Input() pokemon!: Pokemon;
  @Input() reducedSize = false;

  getBackgroundClass(): string {
    
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 1) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      const className = `bg-img-${primaryType} bg-contain bg-center shadow-black`;
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

      const className = `bg-img-${primaryType} bg-contain bg-center shadow-lg shadow-black`;
      return className;
    }
    return '';
  }
  getBackgroundColor(): string {
    
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 0) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      const className = `bg-gradient-to-b from-transparent to-${primaryType}-500 opacity-90 rounded-lg`;
      return className;
    }
    return '';
  }
  formatPokemonNumber(id: number): string {
    return '#' + id.toString().padStart(4, '0');
  }
  constructor(private translocoService: TranslocoService) {}
  
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

    
    getPokemonType(): string {
      const currentLang = this.translocoService.getActiveLang();
      
      if (!this.pokemon?.default_variety?.types?.[0]?.translations) {
        return this.pokemon?.name || 'Unknown Pokemon';
      }
      
      const translation = this.pokemon.default_variety.types[0].translations.find(
        (trans: Translation) => trans.locale === currentLang
      );
      
      return translation?.name || this.pokemon.name || 'Unknown Pokemon';
    }
}
