import { Food } from "./food";

export class Cart{
    _id!:string;
    items!:[{
        food: Food,
        quantity: number,
    }]; 
    total:number=0;
}