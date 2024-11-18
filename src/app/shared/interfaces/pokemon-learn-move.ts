import {PokemonVariety} from "./pokemon-variety";
import {Move} from "./move";
import {MoveLearnMethod} from "./move-learn-method";
import {GameVersion} from "./game-version";



export interface PokemonLearnMove {
    id: number,
    pokemon_variety_id: PokemonVariety,
    move_id: Move,
    move_learn_method_id: MoveLearnMethod,
    game_version_id: GameVersion,
    level: number,
}