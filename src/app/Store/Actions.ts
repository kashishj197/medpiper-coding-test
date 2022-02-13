import ITable from "../Interfaces/Table";

export type Action = { type: "FORM_DATA", payload: ITable };

export const fillTable = (data: ITable): Action => ({
  type: "FORM_DATA",
  payload: data,
});