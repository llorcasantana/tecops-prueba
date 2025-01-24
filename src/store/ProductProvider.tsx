import { ProductContext} from "./ProductContext.ts";
import {FC, ReactNode, useState} from "react";
import {IProduct} from "../interfaces/apiResponse.ts";
export const ProductProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cartItems') as string) || []);
    const addProductToCart = (product: IProduct) => {
        setCart((prev:IProduct[]) => [...prev, product]);
        localStorage.setItem('cartItems', JSON.stringify([...cart, product]));
    }
    const setProductCart = (products: IProduct[]) => {
        setCart([]);
        products.map(item => addProductToCart(item));
        localStorage.setItem('cartItems', JSON.stringify(products));
    }
    return <ProductContext.Provider value={{cart,addProductToCart, setProductCart}}>
        {children}
    </ProductContext.Provider>



};