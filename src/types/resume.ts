type expertBio = {
    avatar:string;
    age:number | null;
    workExperience:string;
}
type skills = string[]
export  type experts = {
    name:string;
    latsName:string;
    bio:expertBio,
    skills:skills,
    price:string
}