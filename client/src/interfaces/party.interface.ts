export interface IParty {
    _id?: string;
    id: number;
    groom: string;
    bride: string;
    phone: string;
    date: string;
    shift: string;
    hall: string;
    deposit: number;
    tables: number;
    reserveTables: number;
    status: string;
}