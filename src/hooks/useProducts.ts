import {useEffect, useState} from "react";
import {IProduct} from "../interfaces/apiResponse.ts";
interface IData{
    status:'SUCCESS' | 'ERROR' | 'LOADING';
    data:IProduct[]
}
export const useProducts = ():{data:IData,fetchData:()=>void} => {
    const [data, setData] = useState<IData>({
        status: 'LOADING',
        data:[]
    })
    useEffect(() => {
        fetchData();
    }, []);
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

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch (e){
            setData({
                status: 'ERROR',
                data: [],
            })
        }

    }
    return {data,fetchData};

}