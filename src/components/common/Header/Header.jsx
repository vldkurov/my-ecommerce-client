import React, {useState} from 'react';
import {NavLink as RouterNavLink, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../features/auth/authOperations'
import {StyledAppBar, StyledCategoryButton, StyledNavLink, StyledToolbar} from './Header.styled';
import {Box, Button} from "@mui/material";
import CategoriesModal from "../../CategoriesModal/CategoriesModal";

// import {useAuth} from "../../../hooks/useAuth";

function Header() {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const isCategoryPageActive = location.pathname.startsWith("/products/all/") && location.pathname.split("/").length > 3;

    // const {categories} = useSelector((state) => state.categories);


    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);


    const handleLogout = async () => {
        dispatch(logout())
            .then(response => {
                // Handle response after successful logout
                console.log(response.payload);
                // You might want to redirect the user to the login page or home page here
                navigate('/');
            })
            .catch(error => {
                // Handle errors, such as network errors or server being unreachable
                console.error('Logout failed', error);
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
                    {/*<Button color="inherit" onClick={handleOpen}>By Category</Button>*/}
                    <StyledCategoryButton
                        color="inherit"
                        onClick={handleOpen}
                        // $isactive={open} // Assuming you want to show it as active when the modal is open
                        $isactive={isCategoryPageActive || open}
                    >
                        By Category
                    </StyledCategoryButton>
                    <StyledNavLink component={RouterNavLink} to="/checkout"
                                   $isactive={location.pathname === '/checkout'}>
                        Checkout
                    </StyledNavLink>
                    {/*<StyledNavLink component={RouterNavLink} to="/protected"*/}
                    {/*               $isactive={location.pathname === '/protected'}>*/}
                    {/*    Protected*/}
                    {/*</StyledNavLink>*/}

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


