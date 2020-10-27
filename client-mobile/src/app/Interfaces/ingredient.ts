export interface ingredient {
    id : number; 
    name : string ; 
    image : string ; 
    price : number ; 
    checked : boolean ;  
    ctn : number ;  
    category : string ; 
}
export interface Salade {
    base : ingredient[]; 
    fruits : ingredient[] ; 
    boisson : ingredient[] ; 
}

