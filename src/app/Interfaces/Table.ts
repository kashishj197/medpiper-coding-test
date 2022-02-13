export default interface ITable {
    id: number;
    key?: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    fullAddress?: string;
    phone: string;
    website: string;
    company?: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: {
        lat: string;
        lng: string;
    };
}