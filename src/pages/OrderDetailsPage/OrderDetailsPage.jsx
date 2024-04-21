import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchOrderById} from '../../features/orders/ordersOperations';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

const OrderDetailsPage = () => {
    const {orderId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const order = useSelector((state) => state.orders.currentOrder);
    const categories = useSelector((state) => state.categories.categories);
    const {status, error} = useSelector((state) => state.orders);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderById(orderId));
        }
    }, [dispatch, orderId]);

    const parsePrice = (price) => parseFloat(price.replace(/[^\d.-]/g, ''));

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.categoryId === categoryId);
        return category ? category.name : "No category";
    };

    const handleContinuePayment = () => {
        const cartId = user.cartId
        navigate(`/carts/${cartId}/checkout`);
    };

    if (status === 'loading') return <p>Loading order details...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
    if (!order) return <p>No order details available.</p>;

    return (
        <Box sx={{p: 2}}>
            <Typography variant="h4" gutterBottom>Order Details for Order #{orderId}</Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="order details table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Unit Price</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.OrderDetails.map((item) => (
                            <TableRow key={item.orderDetailId}>
                                <TableCell component="th" scope="row">{item.Product.name}</TableCell>
                                <TableCell>{getCategoryName(item.Product.categoryId)}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">£{parsePrice(item.price).toFixed(2)}</TableCell>
                                <TableCell
                                    align="right">£{(item.quantity * parsePrice(item.price)).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" sx={{mt: 2}}>Total Price: £{parsePrice(order.totalPrice).toFixed(2)}</Typography>
            <Typography variant="h6">Status: {order.status}</Typography>
            {order.status === 'pending' && (
                <Button variant="contained" color="primary" onClick={handleContinuePayment} sx={{mt: 2}}>
                    Continue to Payment
                </Button>
            )}
        </Box>
    );
};

export default OrderDetailsPage;
