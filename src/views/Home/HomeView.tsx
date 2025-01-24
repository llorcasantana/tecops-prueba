import {FC, ReactNode} from "react";
import {useProducts} from "../../hooks";
import {FiltersBar} from "./FiltersBar.tsx";
import {ProductList} from "./ProductList.tsx";

interface Props {
    children?: ReactNode
}

export const HomeView: FC<Props> = () => {
    const {data, filteredProducts, setFilter, setSearchQuery, categories, searchQuery} = useProducts()

    if(data.status === 'LOADING'){
        return <p>CARGANDO...</p>
    }
    if(data.status === 'ERROR'){
        return <p>ERROR</p>
    }

    return (
        <>
            <section className="py-8 md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <FiltersBar setFilter={setFilter} categories={categories} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    <ProductList filteredProducts={filteredProducts}/>
                </div>
            </section>
        </>
    );
};
