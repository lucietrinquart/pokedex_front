import {Pokemon} from "./pokemon";
import { TypeInteractionStates } from "./type-interaction-states";

export interface Faiblesse {
    pokemon: Pokemon;
    faible: { [key: string]: number }; 
    resiste: { [key: string]: number }; 
    immunities: string[];
  }