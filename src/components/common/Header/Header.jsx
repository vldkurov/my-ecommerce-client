import React from 'react';
import {NavLink as RouterNavLink, useLocation} from 'react-router-dom';
// import {useDispatch} from 'react-redux';
// import {logout} from "../../../features/auth/authSlice";
import {StyledAppBar, StyledNavLink, StyledToolbar} from './Header.styled';
import {Box, Button} from "@mui/material";
// import api from "../../../api/api";

// import {useAuth} from "../../../hooks/useAuth";

function Header() {
    const location = useLocation();
    // const dispatch = useDispatch();
    // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    // const {isAuthenticated} = useAuth();
    // const navigate = useNavigate();

    const handleLogout = async () => {
        // dispatch(logout());

        // // Making a POST request to the logout endpoint using Axios
        // await api.post('/users/logout', {}, {
        //     withCredentials: true // Ensures cookies are sent with the request
        // })
        //     .then(response => {
        //         // Handle response after successful logout
        //         console.log('Logged out successfully');
        //         // You might want to redirect the user to the login page or home page here
        //     })
        //     .catch(error => {
        //         // Handle errors, such as network errors or server being unreachable
        //         console.error('Logout failed', error);
        //     });
        //
        // navigate('/');
    };


    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                {/* Main navigation links (app control segment) */}
                <Box sx={{display: 'flex', flexGrow: 1}}>
                    <StyledNavLink component={RouterNavLink} to="/" $isactive={location.pathname === '/'}>
                        Home
                    </StyledNavLink>
                    <StyledNavLink component={RouterNavLink} to="/products"
                                   $isactive={location.pathname === '/products'}>
                        Products
                    </StyledNavLink>
                    <StyledNavLink component={RouterNavLink} to="/checkout"
                                   $isactive={location.pathname === '/checkout'}>
                        Checkout
                    </StyledNavLink>
                </Box>

                {/* Auth segment */}
                <Box>
                    {/*{!isAuthenticated ? (*/}
                    {/*    <>*/}
                    {/*        <StyledNavLink component={RouterNavLink} to="/register"*/}
                    {/*                       $isactive={location.pathname === '/register'}>*/}
                    {/*            Register*/}
                    {/*        </StyledNavLink>*/}
                    {/*        <StyledNavLink component={RouterNavLink} to="/login"*/}
                    {/*                       $isactive={location.pathname === '/login'}>*/}
                    {/*            Log In*/}
                    {/*        </StyledNavLink>*/}
                    {/*    </>*/}
                    {/*) : (*/}
                    {/*    <Button color="inherit" onClick={handleLogout}>Log Out</Button>*/}
                    {/*)}*/}
                    <>
                        <StyledNavLink component={RouterNavLink} to="/register"
                                       $isactive={location.pathname === '/register'}>
                            Register
                        </StyledNavLink>
                        <StyledNavLink component={RouterNavLink} to="/login"
                                       $isactive={location.pathname === '/login'}>
                            Log In
                        </StyledNavLink>
                        <Button color="inherit" onClick={handleLogout}>Log Out</Button>
                    </>
                </Box>
            </StyledToolbar>
        </StyledAppBar>
    );
}

export default Header;


