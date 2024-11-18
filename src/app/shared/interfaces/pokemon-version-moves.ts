import {Move} from "./move"; // <- here

export interface PokemonVersionMoves {
    pokemon: {
      id: number;
      name: string;
    };
    version: {
      id: number;
      generic_name: string;
      generation: number;
    };
    moves: {
      move: Move;
      learn_method: {
        id: number;
        name: string;
      };
      level: number;
    }[];
  }