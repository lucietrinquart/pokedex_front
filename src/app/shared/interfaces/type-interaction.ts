import {Type} from "./type";
import {TypeInteractionStates} from "./type-interaction-states";

export interface TypeInteraction {
    id:number;
    from_type_id: Type[];
    to_type_id: Type[];
    type_interaction_state_id: TypeInteractionStates;


}