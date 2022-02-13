import { createStore } from "redux";
import { tableReducer } from "./tableReducer";

export const store = createStore(tableReducer);
