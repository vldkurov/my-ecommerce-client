import {useSelector} from 'react-redux';
import {selectProducts, selectProductsError, selectProductsStatus} from "../features/products/productsSelectors";

const useProductData = () => {
    const products = useSelector(selectProducts);
    const status = useSelector(selectProductsStatus);
    const error = useSelector(selectProductsError);

    return {products, status, error};
}

export default useProductData;
