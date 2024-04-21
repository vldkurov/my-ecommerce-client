import React, {useState} from 'react';
import {NavLink as RouterNavLink, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../features/auth/authOperations'
import {StyledAppBar, StyledCategoryButton, StyledNavLink, StyledToolbar} from './Header.styled';
import {Box, Button} from "@mui/material";
import CategoriesModal from "../../CategoriesModal/CategoriesModal";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function Header() {

    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const cart = useSelector((state) => state.cart.cart);
    const cartId = cart?.cartId;
    const cartItems = useSelector((state) => state.cart.items.items);
    const cartItemCount = cartItems ? cartItems.length : 0;


    const isCategoryPageActive = location.pathname.startsWith("/products/all/") && location.pathname.split("/").length > 3;


    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);


    const handleLogout = async () => {
        dispatch(logout())
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                // Assuming error is an object with a message key
                const errorMessage = error.message || "Unknown error";
                console.error('Logout failed', errorMessage);
                alert(`Logout failed: ${errorMessage}`);
            });
    };


    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                {/* Main navigation links (app control segment) */}
                <Box sx={{display: 'flex', flexGrow: 1}}>
                    <StyledNavLink component={RouterNavLink} to="/" $isactive={location.pathname === '/'}>
                        Home
                    </StyledNavLink>
                    <StyledNavLink component={RouterNavLink} to="/products/all"
                                   $isactive={location.pathname === '/products/all'}>
                        Products
                    </StyledNavLink>

                    <StyledCategoryButton
                        color="inherit"
                        onClick={handleOpen}
                        $isactive={isCategoryPageActive || open}
                    >
                        By Category
                    </StyledCategoryButton>
                    {isAuthenticated && cartId && (
                        <>
                            <StyledNavLink component={RouterNavLink} to={`/cart/${cartId}`}
                                           $isactive={location.pathname.includes(`/cart/${cartId}`)}>
                                <ShoppingCartIcon/> Cart ({cartItemCount})
                            </StyledNavLink>
                            {/*<StyledNavLink component={RouterNavLink} to="/checkout"*/}
                            {/*               $isactive={location.pathname === '/checkout'}>*/}
                            {/*    Checkout*/}
                            {/*</StyledNavLink>*/}
                            <StyledNavLink component={RouterNavLink} to="/orders"
                                           $isactive={location.pathname === '/orders'}>
                                Orders
                            </StyledNavLink>
                        </>
                    )}
                </Box>
                {/* Auth segment */}
                <Box>
                    {!isAuthenticated ? (
                        <>
                            <StyledNavLink component={RouterNavLink} to="/register"
                                           $isactive={location.pathname === '/register'}>
                                Register
                            </StyledNavLink>
                            <StyledNavLink component={RouterNavLink} to="/login"
                                           $isactive={location.pathname === '/login'}>
                                Log In
                            </StyledNavLink>
                        </>
                    ) : (
                        <Button color="inherit" onClick={handleLogout}>Log Out</Button>
                    )}
                </Box>
                <CategoriesModal open={open} onClose={handleClose}/>
            </StyledToolbar>
        </StyledAppBar>
    );
}

export default Header;


