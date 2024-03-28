import React, {useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {MainContent} from './Layout.styled';
import {fetchCategories} from "../../../features/categories/categoriesOperations";
import {useDispatch} from "react-redux";


const Layout = ({children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);

    return (
        <>
            <Header/>
            <MainContent>{children}</MainContent>
            <Footer/>
        </>
    );
};

export default Layout;
