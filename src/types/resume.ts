import { user } from "./user";

type resumeBio = {
    avatar:string;
    age:number | null;
    location:string,
}
type skills = string[]
type socials = {
    email:string,
    telegram:string,
}
export  type resume = {
    _id:string | null,
    name:string;
    lastName:string;
    skills:skills;
    price:number;
    socials:socials;
    job:work[],
    about:string,
    additionally:string
    ownerId: user,
    location:string,

}


export type work = {
    nameOfCompany:string,
    startWork:string,
    endWork:string | null,
    position:string,
    responsibilities:string,
}

