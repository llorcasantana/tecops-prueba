import {FC, ReactNode, useContext, useEffect, useState} from "react";
import {useProducts} from "../../hooks";
import {IProduct} from "../../interfaces/apiResponse.ts";
import {ProductContext} from "../../store/ProductContext.ts";
import {Button} from "../../components";
import { useNavigate } from "react-router-dom";

interface Props {
    children?: ReactNode
}
const totalAmmopunt = (items: IProduct[]) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
}

export const CartView: FC<Props> = () => {
    const {data} = useProducts()
    const {cart, addProductToCart, setProductCart} = useContext(ProductContext)
    const [items, setItems] = useState<IProduct[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (data.status === 'SUCCESS') {
            const sortedProducts = cart.sort((a, b) => a.id - b.id);
            const uniqueProducts = sortedProducts.reduce((acc: IProduct[], product: IProduct) => {
                const existingProduct = acc.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity += product.quantity;
                } else {
                    acc.push({ ...product });
                }
                return acc;
            }, []);
            setItems(uniqueProducts);
        }
    }, [data.status, data.data, cart]);

    const increaseQuantity = (id: number) => {
        const item = cart.find(item => item.id === id)||null;
        if (item){
            addProductToCart(item);
        }
    };

    const decreaseQuantity = (id: number) => {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            setProductCart(updatedCart);
        }
    };

    const handleConfirm = () => {
        navigate('/confirmation');
    };
    

    return (
        <>
            <div className="container mx-auto px-4 py-8 animation__appearIn">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h1 className="text-2xl font-bold my-4">Carrito</h1>
                </div>
                <div className="mt-8">

                    {
                        items.length === 0 ? (
                                <p className="text-lg">No tiene elementos en el carrito.</p>
                            ) : (
                        items.map(item => (
                        <div key={item.id} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
                            <div className="flex-shrink-0">
                                <img src={item.image} alt="Product image" className="w-32 h-32 object-cover" />
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-6 w-full">
                                <h2 className="text-lg font-bold text-left">{item.title}</h2>
                                <p className="mt-2 text-gray-600 text-left">{item.description}</p>
                                <div className="mt-4 flex items-center">
                                    <span className="pr-4">Cantidad: </span>
                                    <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                                    <span className="mx-3 text-gray-600">{item.quantity}</span>
                                    <Button onClick={() => increaseQuantity(item.id)}>+</Button>
                                    <span className="ml-auto font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
                <div className="flex justify-end items-center mt-8">
                    <span className="text-gray-600 mr-4">Subtotal:</span>
                    <span className="text-xl font-bold">${totalAmmopunt(cart)}</span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="text-2xl font-bold my-4"></h1>
                <div>
                    <Button className="mr-2" onClick={()=>navigate('/')}>Cancelar</Button>
                    {items.length > 0 && <Button onClick={handleConfirm}>Confirmar</Button>}
                </div>
            </div>
        </>
    );
};
