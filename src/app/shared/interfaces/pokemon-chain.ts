import {Pokemon} from "./pokemon";
import { PokemonEvolution } from "./pokemon-evolution";
import {PokemonVariety} from "./pokemon-variety";

export interface PokemonChain {
    pokemon: Pokemon,
    evolution_avant: PokemonEvolution[],
    evolution_apres: PokemonEvolution[]
}
