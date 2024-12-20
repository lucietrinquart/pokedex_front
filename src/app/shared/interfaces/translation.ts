export interface Translation {
    id: number;
    pokemon_variety_id: number;
    locale: string;
    name: string | null;
    form_name: string | null;
    description: string;
    created_at: string;
    updated_at: string;
  }