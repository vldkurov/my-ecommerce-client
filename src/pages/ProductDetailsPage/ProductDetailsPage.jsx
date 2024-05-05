import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductDetails} from '../../features/product/productOperations';
import {addProductToCart, createCart, fetchCartContents} from '../../features/cart/cartOperations'; // Import the thunks
import {Alert, Box, Card, CardContent, Snackbar, TextField, Typography, useTheme} from '@mui/material';
import {StyledButton} from "./ProductDetailsPage.styled";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const ProductDetailsPage = () => {
    const theme = useTheme();
    const {productId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const {product, status, error} = useSelector((state) => state.product);
    const [quantity, setQuantity] = useState(1); // State to track selected quantity
    const cart = useSelector((state) => state.cart.cart); // Assuming cart state structure
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchProductDetails(productId));
    }, [dispatch, productId]);

    const handleAddToCart = async () => {

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        let currentCartId = cart?.cartId;

        if (!currentCartId) {
            const newCartAction = await dispatch(createCart());
            if (newCartAction.meta.requestStatus === 'fulfilled') {
                currentCartId = newCartAction.payload.cartId;
            } else {
                console.error("Could not create a new cart.");
                return;
            }
        }

        const actionResult = await dispatch(addProductToCart({
            cartId: currentCartId,
            productId: parseInt(productId, 10),
            quantity
        }));


        if (actionResult.meta.requestStatus === 'fulfilled') {

            await dispatch(fetchCartContents(currentCartId));
            setSnackbarOpen(true);
            navigate(`/cart/${currentCartId}`);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    const handleBack = () => {
        navigate('/products/all');
    };

    if (!cart) {
        return <p>Loading cart information...</p>;
    }

    return product ? (
        <Card sx={{mt: 1}}>
            {/*<CardMedia*/}
            {/*    component="img"*/}
            {/*    height="250"*/}
            {/*    image={/path-to-default-image.jpg'}
            {/*    alt={product.name}*/}
            {/*/>*/}
            <Box sx={{
                height: 250,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.placeholder.main,
                color: theme.palette.placeholder.contrastText
            }}>
                <PhotoCameraIcon fontSize="large"/> {/* Добавление иконки */}
            </Box>
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
                {/* Display Category Name and Description */}
                <Box sx={{mt: 2}}> {/* Add spacing above the category details */}
                    <Typography variant="subtitle1" color="text.primary">
                        Category: {product.category?.name || 'No Category'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.category?.description || 'No Description'}
                    </Typography>
                </Box>
                {/* Combined Segment for Actions */}
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2}}>
                    {/* Quantity and Add to Cart Segment */}
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="body2" sx={{mr: 2}}>
                            Quantity:
                        </Typography>
                        <TextField
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                            inputProps={{min: 1}}
                            size="small"
                            sx={{width: '80px', mr: 2}}
                        />
                        <StyledButton onClick={handleAddToCart}>Add to
                            Cart</StyledButton>
                    </Box>
                    {/* Back to Products List Button */}
                    <StyledButton size="small" onClick={handleBack}>
                        Back to Products List
                    </StyledButton>
                </Box>
            </CardContent>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    Product added to cart successfully!
                </Alert>
            </Snackbar>
        </Card>
    ) : null;
};

export default ProductDetailsPage;

