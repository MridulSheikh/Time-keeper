export interface product_data_types {
    id : number;
    img : string;
    title : string;
    ratting : number;
    price : number;
    description : string;
    catagory : string;
    brand : string;
    off : number
}

export interface product_card_data_types {
    id : number;
    img : string;
    title : string;
    ratting : number;
    price : number;
    off : number;
    isbig? :boolean;
}