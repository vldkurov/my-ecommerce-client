import React, {useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {MainContent} from './Layout.styled';
import {useDispatch, useSelector} from "react-redux";

import {fetchCategories} from "../../../features/categories/categoriesOperations";
import {fetchCartContents} from "../../../features/cart/cartOperations";


const Layout = ({children}) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const cartId = user?.cartId;


    useEffect(() => {
        dispatch(fetchCategories());

        // Теперь также отслеживаем изменения в cartId и isAuthenticated
        if (isAuthenticated && cartId) {
            dispatch(fetchCartContents(cartId));
        }
    }, [dispatch, cartId, isAuthenticated]);


    return (
        <>
            <Header/>
            <MainContent>{children}</MainContent>
            <Footer/>
        </>
    );
};

export default Layout;
