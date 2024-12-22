import {AbilityTranslation} from "./ability-translation";

export interface Ability {
    id: number;
    name: string;
    description: string;
    effect: string;
    abilitetrainslation: AbilityTranslation[];

}
