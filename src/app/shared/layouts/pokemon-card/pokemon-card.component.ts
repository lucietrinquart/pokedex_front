import { Component, Input} from '@angular/core';
import { Pokemon } from "../../interfaces/pokemon";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent{
  @Input() pokemon!: Pokemon;

  getBackgroundClass(): string {
    console.log(this.pokemon?.default_variety);
    
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 1) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      const className = `bg-img-${primaryType} bg-contain bg-center`;
      console.log(className);
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
  getBackgroundColor(): string {
    console.log(this.pokemon?.default_variety);
    
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 0) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      const className = `bg-gradient-to-b from-transparent to-${primaryType}-500 opacity-90 rounded-lg`;
      console.log(className);
      return className;
    }
    return '';
  }
}
