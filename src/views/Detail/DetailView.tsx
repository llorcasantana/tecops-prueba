import {FC, ReactNode, useContext} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ProductContext} from "../../store/ProductContext.ts";
import {useProducts} from "../../hooks";
import {Button} from "../../components";

interface Props {
    children?: ReactNode
}

export const DetailView: FC<Props> = () => {
    const {data} = useProducts()
    const [searchParams] = useSearchParams();
    const id  = searchParams.get('id');
    const { addProductToCart } = useContext(ProductContext);
    const product = data.data.find(p => p.id === parseInt(id as string));
    const navigate = useNavigate();

    if(data.status === 'LOADING'){
        return <p>CARGANDO...</p>
    }else{
        if (!product) {
            return <p>Producto no encontrado</p>;
        }
    }

    const addToCart = () => {
        addProductToCart(product);
        navigate('/cart');
    };
    return (
        <>
            <section className="flex items-center gap-16 px-36 py-20 max-lg:flex-col max-sm:py-0 max-sm:px-0 mb-10 animation__appearIn">
                <div className="grid grid-cols-1 w-1/2 max-lg:w-10/12 max-sm:h-3/4 max-sm:w-screen max-sm:mb-[-140px]">
                    <img
                        src={product.image}
                        className="rounded-lg w-10/12 max-sm:w-screen max-sm:h-3/4 max-sm:rounded-none"
                        alt=""
                    />
                </div>
                <div className="w-1/2 max-lg:w-4/5 text-left">
                    <h1 className="text-5xl mt-4 mb-8 max-sm:text-3xl">
                        {product.title}
                    </h1>
                    <p>
                        {product.description}
                    </p>
                    <div className="flex flex-col items-start gap-4 mt-4 mb-5 max-sm:flex-row max-sm:justify-between max-sm:mb-7 max-sm:items-center">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-4xl">${product.price.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 max-lg:flex-col max-lg:items-start max-sm:clear-right">
                        <Button
                            onClick={addToCart}
                        >
                            <span className="text-white font-bold">Agregar al carrito</span>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
