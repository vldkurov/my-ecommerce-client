import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProductFromCart, fetchCartContents} from '../../features/cart/cartOperations';
import {
    Alert,
    Box,
    Button,
    IconButton,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate, useParams} from "react-router-dom";
import {createOrderFromCart} from "../../features/orders/ordersOperations";

const CartPage = () => {
    const {cartId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const cart = useSelector((state) => state.cart);
    const {status, error} = cart;
    const {items = []} = cart.items;


    // Parse the price to float, removing any non-numeric characters except decimal point
    const parsePrice = (price) => {
        return parseFloat(price.replace(/[^\d.-]/g, ''));
    };

    useEffect(() => {
        if (cartId) {
            dispatch(fetchCartContents(cartId));
        }
    }, [dispatch, cartId, items.length]);

    useEffect(() => {
        if (items) {
            const total = items.reduce((acc, item) => acc + item.quantity * parsePrice(item.product?.price || "0"), 0);
            setTotal(total);
        }
    }, [items]);


    const handleDelete = (itemId) => {
        dispatch(deleteProductFromCart({cartId, itemId}));
        setSnackbarMessage('Item deleted successfully!');
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    

    const handleCheckout = (cartId) => {
        dispatch(createOrderFromCart(cartId))
            .unwrap()
            .then(() => {
                navigate(`/carts/${cartId}/checkout`)
            })
            .catch((error) => {
                console.error('Failed to create order:', error);
                // Optionally handle the error, e.g., show an error message
            });
    };


    if (status === 'loading') return <p>Loading cart...</p>;
    if (status === 'failed') return <p>Error: {error.toString()}</p>;
    if (!items || items.length === 0) return <p>Your cart is empty.</p>;

    return (
        <Box sx={{padding: 2}}>
            <Button variant="contained" color="primary"
                    onClick={() => handleCheckout(cartId)}
            >
                Go to Checkout
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="cart table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle1"
                                            style={{fontWeight: 'bold'}}>No.
                                </Typography>
                            </TableCell>
                            <TableCell align="right"><Typography variant="subtitle1" style={{fontWeight: 'bold'}}>Product
                                ID</Typography></TableCell>
                            <TableCell align="right"><Typography variant="subtitle1" style={{fontWeight: 'bold'}}>Product
                                Name</Typography></TableCell>
                            <TableCell align="right"><Typography variant="subtitle1" style={{fontWeight: 'bold'}}>Unit
                                Price</Typography></TableCell>
                            <TableCell align="right"><Typography variant="subtitle1"
                                                                 style={{fontWeight: 'bold'}}>Quantity</Typography></TableCell>
                            <TableCell align="right"><Typography variant="subtitle1" style={{fontWeight: 'bold'}}>Total
                                Price</Typography></TableCell>
                            <TableCell align="right"><Typography variant="subtitle1"
                                                                 style={{fontWeight: 'bold'}}>Delete</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={item.cartItemId}>
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="right">{item.productId}</TableCell>
                                <TableCell align="right">{item.product.name}</TableCell>
                                <TableCell
                                    align="right">£{parsePrice(item.product?.price || "0").toFixed(2)}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell
                                    align="right">£{(item.quantity * parsePrice(item.product?.price || "0")).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="error" onClick={() => handleDelete(item.cartItemId)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6">Total
                    Quantity: {items.reduce((acc, item) => acc + item.quantity, 0)}</Typography>
                <Typography variant="h6">Total Amount: £{total.toFixed(2)}</Typography>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CartPage;

