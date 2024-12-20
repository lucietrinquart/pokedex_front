export interface PokemonUser {
    id: number;
    category: string | null;
    created_at: string;
    updated_at: string;
    has_gender_differences: boolean;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string | null;
    translations: {
        id: number;
        pokemon_id: number;
        locale: string;
        name: string;
        category: string;
    }[];
    pivot?: {
        user_id: number;
        pokemon_id: number;
        created_at: string;
        updated_at: string;
    };
}