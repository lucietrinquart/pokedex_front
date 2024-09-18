export interface Move {
    id: number,
    accuracy: number,
    move_damage_class_id: BigInteger,
    power: number,
    pp: number,
    priority: number,
    type_id: BigInteger,
    created_at: string,
    updated_at: string,
    name: string,
    description: string,
}
