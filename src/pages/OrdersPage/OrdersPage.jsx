import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders} from '../../features/orders/ordersOperations';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Link} from "react-router-dom";

const OrderPage = () => {
    const dispatch = useDispatch();
    const {orders, status, error} = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error.toString()}</p>;

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order.orderId}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {order.orderId}
                            </TableCell>
                            <TableCell align="right">{order.totalPrice}</TableCell>
                            <TableCell align="right">{order.status}</TableCell>
                            <TableCell align="right">
                                <Button component={Link} to={`/orders/${order.orderId}`} color="primary">
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderPage;
