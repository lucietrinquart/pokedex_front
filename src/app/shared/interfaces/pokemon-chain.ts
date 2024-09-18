import {Pokemon} from "./pokemon";
import {PokemonVariety} from "./pokemon-variety";

export interface PokemonChain {
    pokemon: Pokemon,
    evolution_avant: PokemonVariety[],
    evolution_apres: PokemonVariety[]
}
