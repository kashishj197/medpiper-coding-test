import { Dispatch, SetStateAction } from "react";

export default interface ISignIn {
  setSignIn: Dispatch<SetStateAction<boolean>>;
  setLoggedIn?: Dispatch<SetStateAction<boolean>>;
}

export interface ISignInForm {
    username: string;
    password: string;
    remember: boolean;
}