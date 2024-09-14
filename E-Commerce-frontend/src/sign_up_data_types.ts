export interface data_structure{
    business_name : string,
    email: string,
    password: string,
    confirm_pass : string
}
export interface login_data{
    email : string,
    password : string
}
export interface add_product{
    name :string,
    price : number,
    description : string,
    product_id : string,
    category : string,
    image : string,
    id: number
}