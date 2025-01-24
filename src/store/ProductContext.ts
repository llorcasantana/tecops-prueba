import {createContext} from "react";
import {IProduct} from "../interfaces/apiResponse.ts";

interface ProductContextType {
    cart: IProduct[];
    addProductToCart: (products: IProduct) => void;
    setProductCart: (products: IProduct[]) => void;
}
const defaultProductContext: ProductContextType = {
    cart: [],
    addProductToCart: ()=>{},
    setProductCart: ()=>[],
}
export const ProductContext = createContext<ProductContextType >(defaultProductContext);
