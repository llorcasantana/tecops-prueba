import {FC, useContext} from "react";
import {IProduct} from "../../interfaces/apiResponse.ts";
import {ProductContext} from "../../store/ProductContext.ts";
import {Button} from "../../components";
import { useNavigate} from "react-router-dom";

interface Props {
    item: IProduct
}

export const CartItem: FC<Props> = ({item}) => {
    const {addProductToCart} = useContext(ProductContext)
    const navigate = useNavigate();
    return (
            <div
                className="transition-all rounded-lg border border-gray-200 relative group hover:border hover:border-gray-300 hover:radius-1 w-auto">
                <div className="cursor-pointer" onClick={()=>navigate('/detail?id='+item.id)}>
                    <div className="overflow-hidden aspect-w-1 aspect-h-1 h-56">
                        <img
                            className="overflow-hidden mx-auto w-auto h-full transition-all duration-300 group-hover:scale-125"
                            src={item.image} alt=""/>
                    </div>
                    <div className="p-2">
                        <h2 className="text-2xl font-normal text-left">${item?.price.toFixed(2)}</h2>
                        <h3 className="text-left text-xs font-bold text-gray-900 sm:text-sm md:text-base ">
                            <a href="#" title={item?.title} className="">
                                <p className="truncate text-gray-900">{item?.title}</p>
                            </a>
                        </h3>
                    </div>
                </div>
                <div className="w-full sm:flex-1 grid gap-4 grid-cols-1 p-2">
                    <Button onClick={()=>addProductToCart(item)}>Agregar al carrito</Button>
                </div>
            </div>
    );
};
