import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../features/products/productsOperations';
import ProductCard from "../../components/ProductCard/ProductCard";
import Box from '@mui/material/Box';

const ProductsPage = ({categoryId}) => {
    const dispatch = useDispatch();
    const {products, status, error} = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts(categoryId));
    }, [dispatch, categoryId]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <Box sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
            },
            p: 2,
        }}>
            {products.map((product) => (
                <ProductCard key={product.productId} product={product}/>
            ))}
        </Box>
    );
};

export default ProductsPage;


