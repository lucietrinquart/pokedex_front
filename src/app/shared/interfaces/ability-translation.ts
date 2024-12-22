import {Ability} from "./ability";


export interface AbilityTranslation {
    id: number;
    ability_id: number;
    locale: string;
    name: string;
    effect: string | null;
    description: string;
}
