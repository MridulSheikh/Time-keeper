export interface product_data_types {
   _id : string;
   img : string;
   name : string;
   description : string;
   brand : string | Brand_data_types;
   category : string | Category_data_types;
   price : number;
   reviews : any;
   createdAt : string;
   updatedAt : string;
   __v : number;
}

export interface product_card_data_types {
    _id : string;
    img : string;
    name : string;
    reviews : any;
    price : number;
    isbig? :boolean;
}

export interface Blog_card_data_types {
    _id : number;
    cover: string;
    slug: string;
    title: string;
    author: string;
    updatedAt : string;
    body : string;
}

export interface Category_data_types {
    _id: string;
    name : string;
    product: any;
    create_by : string;
    createdAt : string;
    updatedAt : string;
    __v : number;
}

export interface Brand_data_types {
    _id : string;
    logo : string;
    name : string;
    number : string;
    products : any;
    createdAt : string;
    updatedAt : string;
    __v : number;
}

export interface Order_data_types{
    _id : string;
    total : number;
    address : {
        country: string,
        number: string,
        state: string,
        post: string,
        email: string,
        address_1_line: string;
    };
    confirm : boolean;
    paid : boolean;
    item : [{
        _id : string;
        img : string;
        name : string;
        price : number;
        quantity : number;
    }];
    createdAt : string;
    updatedAt : string;
    status : string;
    __v: number;
}