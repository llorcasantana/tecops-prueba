import {CartItem} from "./CartItem.tsx";
import {IProduct} from "../../interfaces/apiResponse.ts";
interface Props {
    filteredProducts: IProduct[];
}
export const ProductList = ({filteredProducts}:Props) => {
    return (
        <div className="mb-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
                <CartItem key={product.id} item={product} />
            ))}
        </div>
    );
};