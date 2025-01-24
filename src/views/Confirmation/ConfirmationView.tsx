
import { useNavigate } from "react-router-dom";
import {FC, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {ProductContext} from "../../store/ProductContext.ts";
import {IProduct} from "../../interfaces/apiResponse.ts";
import {useProducts} from "../../hooks";
import {Button} from "../../components";
import { InputMask } from 'primereact/inputmask';
import {InputText} from "primereact/inputtext";
import { Toast } from 'primereact/toast';

interface Props {
    children?: ReactNode
}

export const ConfirmationView: FC<Props> = () => {
    const {data} = useProducts()
    const { cart, setProductCart } = useContext(ProductContext)
    const [items, setItems] = useState<IProduct[]>([]);
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const [name, setName] = useState<string | undefined>(undefined);
    const [card, setCard] = useState<string | undefined>(undefined);
    const [exp, setExp] = useState<string | undefined>(undefined);
    const [ccv, setCcv] = useState<string | undefined>(undefined);



    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    const handleCancel = () => {
        navigate('/cart')
    }
    const handleFinalize = () => {
        if(name && card && exp && ccv){
            toast.current?.show({severity:'success', summary: 'Completado', detail:'Pago completado', life: 3000});
            setTimeout(()=> {
                setProductCart([]);
                navigate('/')
            }, 3000);
        }else{
            toast.current?.show({severity:'error', summary: 'Error', detail:'Todos los campos son requeridos', life: 3000});
        }
    };
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

    return (
        <section className="bg-white py-8 antialiased md:py-16">
            <Toast ref={toast} />
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <h1 className="text-2xl font-bold my-4">Completar pago</h1>

                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 text-left">
                        <form action="#"
                              className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6 lg:max-w-xl lg:p-8">
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="full_name"
                                           className="mb-2 block text-sm font-medium text-gray-900"> Nombre completo* </label>
                                    <InputText
                                        id="full_name"
                                        value={name || ''}
                                        onChange={(e) => setName(e.target.value as string)}
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                        placeholder="Bonnie Green"
                                        keyfilter="alphanum" />
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="card-number-input"
                                           className="mb-2 block text-sm font-medium text-gray-900"> Número de tarjeta* </label>
                                    <InputMask
                                        value={card || ''}
                                        onChange={(e) => setCard(e.target.value as string)}
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        mask="9999-9999-9999-9999"
                                        placeholder="xxxx-xxxx-xxxx-xxxx"/>
                                </div>

                                <div>
                                    <label htmlFor="card-expiration-input"
                                           className="mb-2 block text-sm font-medium text-gray-900"> Vencimiento de la tarjeta* </label>
                                    <div className="relative">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                            <svg className="h-4 w-4 text-gray-500" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <InputMask
                                            value={exp || ''}
                                            onChange={(e) => setExp(e.target.value as string)}
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                            mask="99/99"
                                            placeholder="MM/YY"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cvv-input"
                                           className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900"> CVV*
                                    </label>
                                    <InputMask
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                                        value={ccv || ''}
                                        onChange={(e) => setCcv(e.target.value as string)}
                                        mask="999"
                                        placeholder="***" />
                                </div>
                            </div>

                        </form>

                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div
                                className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
                                <div className="space-y-2">
                                    {
                                        items.map(item => (
                                            <dl key={item.id} className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 text-left truncate w-[300px]">{`${item.quantity}x ${item.title}`}</dt>
                                                <dd className="text-base font-medium text-gray-900">${item.price * item.quantity}</dd>
                                            </dl>
                                        ))
                                    }
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">${totalAmount}</dd>
                                </dl>
                                <div className="flex justify-between mt-8">
                                    <Button className="" onClick={handleCancel}>Cancelar</Button>
                                    <Button className="" onClick={handleFinalize}>Completar pago</Button>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-8">
                                <img className="hidden h-8 w-auto flex"
                                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                                     alt=""/>
                                <img className="hidden h-8 w-auto flex"
                                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                                     alt=""/>
                                <img className="hidden h-8 w-auto"
                                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                                     alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};
