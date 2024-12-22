import {PokemonVariety} from "./pokemon-variety";
import {Translation} from "./translation"; // <- here


export interface Pokemon {
    category: string;
    created_at: string;
    default_variety: PokemonVariety;
    has_gender_differences: boolean;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    updated_at: string;
    varieties: PokemonVariety[];
    translations: Translation[];
    
}