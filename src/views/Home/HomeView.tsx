
import {FC, ReactNode, useState, useEffect} from "react";
import {useProducts} from "../../hooks";
import {CartItem} from "./CartItem.tsx";
import {Dropdown} from "../../components/dropdown/Dropdown.tsx";
import {IProduct} from "../../interfaces/apiResponse.ts";

interface Props {
    children?: ReactNode
}

export const HomeView: FC<Props> = () => {
    const {data} = useProducts()
    const [filter, setFilter] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        if (data.status === 'SUCCESS') {
            const uniqueCategories = data.data
                .map((product: IProduct) => product.category)
                .filter((category, index, self) => self.indexOf(category) === index);
            setCategories(uniqueCategories);
        }
    }, [data]);

    if(data.status === 'LOADING'){
        return <p>CARGANDO...</p>
    }
    if(data.status === 'ERROR'){
        return <p>ERROR</p>
    }
    const filteredProducts: IProduct[] = data.data
        .filter((product) => !filter || product.category === filter)
        .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));


    return (
        <>
            <section className="py-8 md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                        <div className="flex items-center space-x-4">
                            <Dropdown label="Filtros">
                                <a onClick={() => setFilter(null)} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all" role="menuitem" id="menu-item-0">Todos</a>
                                {categories.map((category) => (
                                    <a onClick={() => setFilter(category)} href="#" className="capitalize w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all" role="menuitem" key={category}>{category}</a>
                                ))}

                            </Dropdown>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-md border-gray-200 focus:outline-none  focus:border-gray-600 hover:border-gray-400 transition-all"
                            />
                        </div>
                    </div>
                    <div className="mb-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <CartItem key={product.id} item={product} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
