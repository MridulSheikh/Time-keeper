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

export interface Blog_card_data_types {
    id : number;
    cover: string;
    slug: string;
    title: string;
    create_at: string;
}

export interface Blog_feed_card_data_Types {
    id : number;
    cover : string;
    slug : string;
    title : string;
    create_at : string;
    discription : string;
}

export interface Category_data_types {
    id: string;
    name : string;
    product: any;
    create_by : string;
    setCategory : any;
    category: any;
}