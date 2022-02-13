import ITable from "../Interfaces/Table";
import { Action } from "./Actions";

export interface TableState {
    data: ITable[]
}

const initialState = {
    data: []
}

export const tableReducer = (state: TableState = initialState, action: Action) => {
    switch (action.type) {
        case "FORM_DATA": {
            return {...state, data: [...state.data, action.payload]}
        }
        default:
            return state;
    }
}