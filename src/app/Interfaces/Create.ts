import ITable, { IAddress } from "./Table";

export interface ICreateForm {
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website?: string;
}