export interface TypeMapping {
    [key: string]: {
        original: string;
        translations: { [lang: string]: string };
      };
}
