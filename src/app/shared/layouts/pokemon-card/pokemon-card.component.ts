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
    
    if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 1) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();
      const className = `bg-gradient-to-b from-transparent to-${primaryType} opacity-90 rounded-lg`;
      console.log(className);
      const className1 = `bg-gradient-to-r from-normal-500 to-transparent`;
      const className2 = `bg-gradient-to-r from-fire-500 to-transparent`;
      const className3 = `bg-gradient-to-r from-water-500 to-transparent`;
      const className4 = `bg-gradient-to-r from-grass-500 to-transparent`;
      const className5 = `bg-gradient-to-r from-electric-500 to-transparent`;
      const className6 = `bg-gradient-to-r from-ice-500 to-transparent`;
      const className7 = `bg-gradient-to-r from-fighting-500 to-transparent`;
      const className8 = `bg-gradient-to-r from-poison-500 to-transparent`;
      const className9 = `bg-gradient-to-r from-ground-500 to-transparent`;
      const className10 = `bg-gradient-to-r from-flying-500 to-transparent`;
      const className11 = `bg-gradient-to-r from-psychic-500 to-transparent`;
      const className12 = `bg-gradient-to-r from-bug-500 to-transparent`;
      const className13 = `bg-gradient-to-r from-rock-500 to-transparent`;
      const className14 = `bg-gradient-to-r from-ghost-500 to-transparent`;
      const className15 = `bg-gradient-to-r from-dragon-500 to-transparent`;
      const className16 = `bg-gradient-to-r from-dark-500 to-transparent`;
      const className17 = `bg-gradient-to-r from-steel-500 to-transparent`;
      const className18 = `bg-gradient-to-r from-fairy-500 to-transparent`;      

      return className;
    }
    else if (this.pokemon?.default_variety?.types && this.pokemon.default_variety.types.length > 0) {
      const primaryType = this.pokemon.default_variety.types[0].name.toLowerCase();

      const className = `bg-gradient-to-b from-transparent to-${primaryType} opacity-90 rounded-lg`;
      

      return className;
    }
    return '';
  }
}
