import {useEffect, useState} from "react";
import {IProduct} from "../interfaces/apiResponse.ts";
interface IData{
    status:'SUCCESS' | 'ERROR' | 'LOADING';
    data:IProduct[]
}
export const useProducts = ():{
    data: IData;
    fetchData: () => Promise<void>;
    filteredProducts: IProduct[];
    setFilter: (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void;
    setCategories: (value: (((prevState: string[]) => string[]) | string[])) => void;
    setSearchQuery: (value: (((prevState: string) => string) | string)) => void;
    categories: string[];
    searchQuery: string;
    filter: string | null
} => {
    const [data, setData] = useState<IData>({
        status: 'LOADING',
        data:[]
    })
    const [filter, setFilter] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");


    useEffect(() => {
        fetchData();
    });
    const fetchData =async ()=>{
        try{
            const request = await fetch('https://fakestoreapi.com/products');
            const response:IProduct[] = await request.json();
            const nData = response.map((product) => (
                {
                    ...product,
                    quantity: 1,
                }
            ));
            setData({
                status: 'SUCCESS',
                data: nData,
            })
            buildFilters(nData);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch (e){
            setData({
                status: 'ERROR',
                data: [],
            })
        }

    }
    const buildFilters = (data:IProduct[]) => {
        const uniqueCategories = data
            .map((product: IProduct) => product.category)
            .filter((category, index, self) => self.indexOf(category) === index);
        setCategories(uniqueCategories);
    }
    const filteredProducts: IProduct[] = data.data
        .filter((product) => !filter || product.category === filter)
        .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return {data,fetchData, filteredProducts, setFilter, setCategories, setSearchQuery, categories, searchQuery, filter};

}