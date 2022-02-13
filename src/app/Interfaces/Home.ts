import { Dispatch, SetStateAction } from 'react';

export default interface IHome {
  setLoginStatus: Dispatch<SetStateAction<boolean>>;
}
