export class Order{
    _id!:string;
    username!:string;
    usercontact!:string;
    items:[]=[];
    foodname!:string;
    total:number=0;
    table!:number; 
    status!:string;
    paymentstatus:string="unpaid"
    orderdate!:string
}