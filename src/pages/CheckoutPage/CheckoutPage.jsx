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
import {cancelOrder, createPaymentSession, fetchOrderById} from "../../features/orders/ordersOperations";

function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector((state) => state.orders.currentOrder);
    const orderId = localStorage.getItem('currentOrderId');  // Получаем orderId из LocalStorage
    const orderStatus = useSelector((state) => state.orders.status);
    const orderError = useSelector((state) => state.orders.error);
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
        dispatch(createPaymentSession(orderId))
            .unwrap()
            .then((session) => {
                window.location.href = session.url;
            })
            .catch((error) => {
                console.error('Payment session creation failed:', error);
                alert("Failed to initiate payment: " + error.message);
            });
    };


    const handleViewDetails = () => {
        navigate(`/orders/${orderId}`);
    };

    const handleCancelOrder = () => {
        dispatch(cancelOrder(orderId));
        localStorage.removeItem('currentOrderId');
        navigate(`/orders/${orderId}`);
    };

    if (orderStatus === 'loading') return <div>Loading...</div>;
    if (orderStatus === 'failed') return <div>Error: {orderError}</div>;
    if (!order || order.status === 'cancelled') return <div>No order details available or order was cancelled.</div>;

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
                <Button variant="contained" color="secondary" onClick={handleCancelOrder}>
                    Cancel Order
                </Button>
            </Box>
        </Box>
    );
}

export default CheckoutPage;

