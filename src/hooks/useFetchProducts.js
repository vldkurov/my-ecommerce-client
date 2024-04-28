import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchProducts} from "../features/products/productsOperations";


function useFetchProducts(categoryId) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProducts(categoryId));
        } else {
            dispatch(fetchProducts()); // Consider fetching all products if no categoryId is specified
        }
    }, [dispatch, categoryId]);
}

export default useFetchProducts
