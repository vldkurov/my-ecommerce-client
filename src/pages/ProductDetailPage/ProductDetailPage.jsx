import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductDetails} from '../../features/product/productOperations';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {StyledButton, StyledCardActions} from "./ProductDetailPage.styled";

const ProductDetailPage = () => {
    const {productId} = useParams();
    const navigate = useNavigate(); // Use useNavigate hook
    const dispatch = useDispatch();
    const {product, status, error} = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductDetails(productId));
    }, [dispatch, productId]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    const handleBack = () => {
        // navigate(-1); // Navigate back
        navigate('/products'); // Navigate back
    };

    return product ? (
        <Card>
            <CardMedia
                component="img"
                height="250"
                image={product.imageUrl || '/path-to-default-image.jpg'}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    Price: {product.price}
                </Typography>
                <StyledCardActions>
                    <StyledButton size="small" onClick={handleBack}>
                        Back to Products List
                    </StyledButton>
                </StyledCardActions>
            </CardContent>
        </Card>
    ) : null;
};

export default ProductDetailPage;


