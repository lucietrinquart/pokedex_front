import {Translation} from "./translation";


export interface Type {
    id: number;
    sprite_url: string;
    name: string;
    translations: Translation[];
  }