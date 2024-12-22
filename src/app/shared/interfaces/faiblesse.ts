import {Pokemon} from "./pokemon";
import { TypeInteractionStates } from "./type-interaction-states";
import {Translation} from "./translation";


export interface Faiblesse {
    pokemon: Pokemon;
    faible: { [key: string]: number }; 
    resiste: { [key: string]: number }; 
    immunities: string[];
    translations: Translation[];

  }