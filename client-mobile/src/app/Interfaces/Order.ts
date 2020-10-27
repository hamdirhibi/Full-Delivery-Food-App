import { User } from 'firebase';
import { product } from './Product';

export interface Order {
    _id : string ; 
    author : User ; 
    products  : product[]; 
    quantities : number[] ; 
    total : number ;
    state : string ;
    CreatedAt : Date;
    paymentMethod : string ; 
    deleveryDate : string ; 
    phone : string ;
    weight : number ;
    freeSpace : string ; 
    orderAddress : string ; 
}