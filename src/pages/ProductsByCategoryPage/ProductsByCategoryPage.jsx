import React from 'react';
import ProductCard from "../../components/ProductCard/ProductCard";
import Box from '@mui/material/Box';
import {useParams} from "react-router-dom";
import {useFetchProducts, useProductData} from "../../hooks";

const ProductsByCategoryPage = () => {
    const {categoryId} = useParams();

    useFetchProducts(categoryId);

    const {products, status, error} = useProductData();

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

export default ProductsByCategoryPage;


