import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import {deleteOrder, fetchOrderById} from "../../features/orders/ordersOperations";

function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector((state) => state.orders.currentOrder);
    const orderId = localStorage.getItem('currentOrderId');  // Получаем orderId из LocalStorage
    const [tax, setTax] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [totalWithTax, setTotalWithTax] = useState(0);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderById(orderId));
        }
    }, [dispatch, orderId]);

    useEffect(() => {
        if (order && order.totalPrice) {
            const total = parseFloat(order.totalPrice.replace(/[^\d.-]/g, ''));
            const calculatedTaxAmount = total * (tax / 100);
            setTaxAmount(calculatedTaxAmount);
            setTotalWithTax(total + calculatedTaxAmount);
        }
    }, [order, tax]);

    const handleTaxChange = (event) => {
        setTax(parseFloat(event.target.value));
    };

    const handleConfirmOrder = () => {
        console.log('Order confirmed');
        navigate('/thank-you'); // Redirect to a confirmation/thank you page
    };

    const handleViewDetails = () => {
        navigate(`/orders/${orderId}`); // Navigate to order details page
    };

    const handleRemoveOrder = () => {
        dispatch(deleteOrder(orderId));
        localStorage.removeItem('currentOrderId');  // Удаляем orderId из LocalStorage после удаления заказа
        navigate('/cart'); // Navigate back to the cart or home page after deletion
    };

    if (!order) return <div>Loading...</div>;

    return (
        <Box sx={{p: 2}}>
            <Typography variant="h4" gutterBottom>Checkout Summary</Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">{order?.orderId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Total Price</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} align="right">{order?.totalPrice}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax Rate (%)</TableCell>
                            <TableCell align="right">
                                <TextField
                                    value={tax}
                                    onChange={handleTaxChange}
                                    type="number"
                                    size="small"
                                    sx={{width: 90}}
                                />
                                <Typography sx={{ml: 2, display: 'inline'}}>Tax Amount:
                                    £{taxAmount.toFixed(2)}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Total Including Tax</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} align="right">£{totalWithTax.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">{order?.status}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="contained" color="primary" onClick={handleViewDetails}>
                    Order Details
                </Button>
                <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
                    Confirm Order
                </Button>
                <Button variant="contained" color="secondary" onClick={handleRemoveOrder}>
                    Remove Order
                </Button>
            </Box>
        </Box>
    );
}

export default CheckoutPage;

