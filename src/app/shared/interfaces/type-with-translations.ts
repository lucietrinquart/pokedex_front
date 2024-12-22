import {TypeTranslation} from "./type-translation"; // <- here


export interface TypeWithTranslations {
    id: number;
    name: string;
    translations: TypeTranslation[];
  }