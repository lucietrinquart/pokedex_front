import {Pokemon} from "./pokemon";
import {PokemonVariety} from "./pokemon-variety";
import {Item} from "./item";
import {Type} from "./type";
import {Move} from "./move";
import {EvolutionTrigger} from "./evolution-trigger";

export interface PokemonEvolution {
    id: number,
    pokemon_variety: PokemonVariety,
    evolves_to: PokemonVariety,
    pokemon_evolutions_held: Item,
    pokemon_evolutions_item: Item,
    known_move_id: Move,
    known_move_type_id: Type,
    party_type_id: Type,
    party_species: Pokemon,
    trade_species: Pokemon,
    evolution_trigger_id: EvolutionTrigger,
    gender: boolean,
    location: string,
    min_affection: number,
    min_happiness: number,
    min_level: number,
    need_overworld_rain: boolean,
    relative_physical_stats: number,
    time_of_day: string,
    turn_upside_down: boolean,
    created_at: string,
    updated_at: string
}
